import { STAFF_IDS, type StaffId } from './constants'

const normalizeId = (id: string | number | undefined): string | undefined => {
  if (id === undefined) return undefined;
  return String(id).replace(/[^\d]/g, '');
}

export const getStaffName = (staffId: string | number | undefined) => {
  if (!staffId) return 'Not attributed';
  const normalizedId = normalizeId(staffId);
  const staff = Object.values(STAFF_IDS).find(staff => staff.id === normalizedId);
  return staff ? staff.name : 'Unknown staff';
}
