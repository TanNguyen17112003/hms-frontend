export const shortenUUID = (uuid: string, type: 'ORDER' | 'DELIVERY') => {
  return `#${type === 'ORDER' ? 'HealthPro' : 'DELI'}${uuid?.slice(uuid.length - 6, uuid.length).toUpperCase()}`;
};
