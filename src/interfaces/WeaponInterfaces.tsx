export interface WeaponBasic {
    weaponID: number;
    weaponName: string;
}

export interface WeaponDetails extends WeaponBasic{
    weaponType: string;
    damageType: string;
    weaponDamageByLevel: {[level: number]: number};
}

export interface WeaponDetailsFull extends WeaponDetails {
    dataType: string;
    apCost: number;
    criticalBonus: number;
} 

export interface RangedWeaponDetails extends WeaponDetailsFull {
    fireRate: number;
    magazineSize: number;
    range: number;
    accuracy: number;
}

export interface MeleeWeaponDetails extends WeaponDetailsFull {

}