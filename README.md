# Staff Attribution POS UI Extension Example

This example app demonstrates a POS UI Extension that enables staff attribution for sales. It allows store associates to launch the extension via the smart grid and scan staff IDs before completing a checkout to attribute sales to staff members.

## Features

- Scan staff IDs to attribute sales
- Seamless integration with Shopify POS
- Simple user interface for staff identification

## Prerequisites

- Shopify Partner account
- Shopify CLI installed
- Hardware barcode scanner connected to your device

## Installation and Setup

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `shopify app dev` to install the extension on a device with Shopify POS installed

## Usage

When a customer is ready to checkout, the staff member will be prompted to scan a staff ID before proceeding with the transaction.

- The Tile logic has a call to action show destructive when one or more line items are missing attribution.
- Badge is used to indicate number of attributed line items.

## Development

This app is built using Shopify's App and Extension frameworks. Refer to [Shopify's developer documentation](https://shopify.dev/docs/apps/build/pos/embed-app-in-pos) for more information on POS UI Extensions.
