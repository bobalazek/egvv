import { SimpleForm, TextInput, required, Edit, EditProps, AutocompleteArrayInput } from 'react-admin';

import { USER_ROLES } from '@egvv/shared-constants';

export const UserEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="username" validate={required()} />
      <TextInput source="email" validate={required()} />
      <TextInput source="password" helperText="Only set, if you want to change the password" />
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
