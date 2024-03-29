import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  ShowButton,
  EditButton,
  DeleteButton,
  ListProps,
  TextInput,
  NumberField,
} from 'react-admin';

export const EventSessionDriverPitStopList = (props: ListProps) => (
  <List
    sort={{
      field: 'lap',
      order: 'asc',
    }}
    filters={[<TextInput label="Search" source="q" alwaysOn />]}
    {...props}
  >
    <Datagrid>
      <ReferenceField source="eventSessionDriverId" reference="EventSessionDriver">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="lap" />
      <NumberField source="stopTimeMilliseconds" />
      <NumberField source="timeMilliseconds" />
      <TextField source="tyres" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
