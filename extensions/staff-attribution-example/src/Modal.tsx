import React, { useEffect, useState } from 'react'

import { Text, Screen, ScrollView, Navigator, reactExtension, useCartSubscription, Stack, Box, useScannerDataSubscription, NumberField, useApi } from '@shopify/ui-extensions-react/point-of-sale'
import { STAFF_IDS, type StaffId } from './constants'
import { getStaffName } from './utils'

const Modal = () => {
  const cart = useCartSubscription()
  const api = useApi()
  const {data: scannedData, source} = useScannerDataSubscription();
  const [output, setOutput] = useState("No scans yet");
  const {currentSession, getSessionToken} = useApi<'pos.home.modal.render'>().session;

  useEffect(() => {
    if (!scannedData) return;

    // Uncomment this to set the staff ID to the scanned data for all items in the cart
    // api.cart.setAttributedStaff(Number(scannedData));

    // Find the first unattributed item in the cart and set the staff ID to the scanned data
    const unattributedItem = cart.lineItems.find(item => !(item as any).attributedUserId);

    setOutput("unattributedItem: " + JSON.stringify(unattributedItem));
    if (!unattributedItem) return;

    setOutput("unattributedItem: " + unattributedItem.productId);
    api.cart.setAttributedStaffToLineItem(Number(scannedData), unattributedItem.uuid);
  }, [scannedData]);

  const {shopId, userId, locationId, staffMemberId} = currentSession;
  const [sessionToken, setSessionToken] = useState<string>();

  getSessionToken().then((newToken) => {
    setSessionToken(newToken);
  });

  return (
    <Navigator>
      <Screen name="StaffAttribution" title="Staff attribution">
        <ScrollView>
          {cart.lineItems.map((item) => (
            <Box key={item.uuid} paddingBlockEnd="400">
            <Stack direction="inline">
            <Stack direction="block" flex={1}>
              <Text>{item.title}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Attributed staff: {getStaffName((item as any).attributedUserId)}</Text>
            </Stack>
            <Stack direction="inline" key={item.uuid}>
              <Text>{item.price}</Text>
            </Stack>
            </Stack>
            <NumberField
              label="Staff ID"
              value={(item as any).attributedUserId ? String((item as any).attributedUserId) : ''}
              required={true}
              onChange={(value) => {
                api.cart.setAttributedStaffToLineItem(Number(value), item.uuid);
              }}
            />
            </Box>
          ))}
          <Box paddingBlockEnd="400">
            <Text variant="headingLarge">Scanner data</Text>
            <Text>Scanned data: {scannedData}</Text>
            <Text>Scanner source: {source}</Text>
          </Box>
          <Box paddingBlockEnd="400">
            <Text variant="headingLarge">Miscellaneous data</Text>
            <Text>State: {output}</Text>
            <Text>Pinned-in Staff ID: {staffMemberId}</Text>
            <Text>ID matches: {staffMemberId === Number(scannedData) ? "true" : "false"}</Text>
          </Box>
        </ScrollView>
      </Screen>
    </Navigator>
  )
}

export default reactExtension('pos.home.modal.render', () => <Modal />);
