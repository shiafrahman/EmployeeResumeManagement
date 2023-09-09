import { FormGroup } from "@angular/forms";

export function MustMatch(pN: string, cpN: string) {
    return (formGroup: FormGroup) => {
        const c = formGroup.controls[pN];
        const cp = formGroup.controls[cpN];
        if (cp.errors && !cp.errors['mustMatch']) { return; }
        if (c.value !== cp.value) {
            cp.setErrors({ mustMatch: true });
        } else {
            cp.setErrors(null);
        }
    }
}