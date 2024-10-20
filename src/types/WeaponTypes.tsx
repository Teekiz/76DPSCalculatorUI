export type WeaponSearch = {
    weaponID: number,
    weaponName: string;
};

export type weaponDetails = {
    weaponName: string,
    weaponType: string,
    damageType: string,
    weaponDamageByLevel: {[level: number]: number};
}