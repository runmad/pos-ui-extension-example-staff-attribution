// This is a list of staff IDs and their names.
// The IDs are the IDs of the staff in the Shopify admin.
export const STAFF_IDS = {
    JOHN: {
      id: '118214787389',
      name: 'John'
    },
    RUNE: {
      id: '118200009021',
      name: 'Rune'
    }
  } as const;

  export type StaffId = (typeof STAFF_IDS)[keyof typeof STAFF_IDS]['id'];
