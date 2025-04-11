import React from 'react'

import { Tile, reactExtension, useApi, useCartSubscription } from '@shopify/ui-extensions-react/point-of-sale'
import { STAFF_IDS, type StaffId } from './constants'
import { getStaffName } from './utils'

const TileComponent = () => {
  const api = useApi()
  const cart = useCartSubscription()
  const attributedStaff = cart.lineItems.map(item => (item as any).attributedUserId)

  const validStaffIds = attributedStaff.filter(Boolean)
  const hasAttribution = validStaffIds.length > 0

  const staffSummary = hasAttribution
    ? validStaffIds.map(getStaffName).join(', ')
    : 'No sales attribution'

  return (
    <Tile
      title="Staff attribution"
      subtitle={`${staffSummary} • ${cart.lineItems.length} items in cart`}
      onPress={() => {
        api.action.presentModal()
      }}
      badgeValue={validStaffIds.length}
      destructive={validStaffIds.length < cart.lineItems.length} // As a call to action show destructive when any line item is missing attribution
      enabled={true}
    />
  )
}

export default reactExtension('pos.home.tile.render', () => {
  return <TileComponent />
})
