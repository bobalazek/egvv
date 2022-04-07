import { Create, SimpleForm, TextInput, required, CreateProps, AutocompleteArrayInput } from 'react-admin';

import { USER_ROLES } from '@egvv/shared';

export const UserCreate = (props: CreateProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="username" validate={required()} />
      <TextInput source="email" validate={required()} />
      <AutocompleteArrayInput
        source="roles"
        choices={USER_ROLES.map((role) => {
          return { id: role, name: role };
        })}
        validate={required()}
      />
    </SimpleForm>
  </Create>
);
