import type { SelectOption } from "@/shared/ui/select";

export const TITLE_OPTIONS: SelectOption[] = [
  { value: "mr",   label: "Mr." },
  { value: "ms",   label: "Ms." },
  { value: "mrs",  label: "Mrs." },
  { value: "dr",   label: "Dr." },
  { value: "prof", label: "Prof." },
];

export const GENDER_OPTIONS: SelectOption[] = [
  { value: "male",              label: "Male"             },
  { value: "female",            label: "Female"           },
  { value: "other",             label: "Other"            },
  { value: "prefer_not_to_say", label: "Prefer not to say"},
];

export const DOCUMENT_TYPE_OPTIONS: SelectOption[] = [
  { value: "passport",       label: "Passport"        },
  { value: "national_id",    label: "National ID"     },
  { value: "drivers_license",label: "Driver's License"},
];

export const COUNTRY_CODE_OPTIONS: SelectOption[] = [
  { value: "+1",   label: "+1 (US, CA)"   },
  { value: "+44",  label: "+44 (UK)"      },
  { value: "+57",  label: "+57 (CO)"      },
  { value: "+52",  label: "+52 (MX)"      },
  { value: "+55",  label: "+55 (BR)"      },
  { value: "+54",  label: "+54 (AR)"      },
  { value: "+56",  label: "+56 (CL)"      },
  { value: "+51",  label: "+51 (PE)"      },
  { value: "+34",  label: "+34 (ES)"      },
  { value: "+33",  label: "+33 (FR)"      },
  { value: "+49",  label: "+49 (DE)"      },
  { value: "+39",  label: "+39 (IT)"      },
  { value: "+351", label: "+351 (PT)"     },
  { value: "+31",  label: "+31 (NL)"      },
  { value: "+61",  label: "+61 (AU)"      },
  { value: "+81",  label: "+81 (JP)"      },
  { value: "+82",  label: "+82 (KR)"      },
  { value: "+86",  label: "+86 (CN)"      },
  { value: "+91",  label: "+91 (IN)"      },
  { value: "+971", label: "+971 (AE)"     },
  { value: "+27",  label: "+27 (ZA)"      },
  { value: "+7",   label: "+7 (RU)"       },
  { value: "+90",  label: "+90 (TR)"      },
  { value: "+20",  label: "+20 (EG)"      },
  { value: "+62",  label: "+62 (ID)"      },
];
