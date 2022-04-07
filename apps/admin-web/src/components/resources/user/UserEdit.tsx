import { SimpleForm, TextInput, required, Edit, EditProps, AutocompleteArrayInput } from 'react-admin';

import { USER_ROLES } from '@egvv/shared';

export const UserEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
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
  </Edit>
);
