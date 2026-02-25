import { HttpContextToken } from "@angular/common/http";

// Por defecto, asumimos que todas las peticiones NECESITAN token (false)
export const IS_PUBLIC = new HttpContextToken<boolean>(() => false);
