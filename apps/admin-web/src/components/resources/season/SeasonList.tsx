import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
  ShowButton,
  EditButton,
  DeleteButton,
  ListProps,
  TextInput,
} from 'react-admin';

export const SeasonList = (props: ListProps) => (
  <List
    sort={{
      field: 'startAt',
      order: 'desc',
    }}
    filters={[<TextInput label="Search" source="q" alwaysOn />]}
    {...props}
  >
    <Datagrid>
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="year" />
      <DateField source="startAt" />
      <DateField source="endAt" />
      <ReferenceField source="seriesId" reference="Series">
        <TextField source="name" />
      </ReferenceField>
      <ShowButton />
      <EditButton />
      <DeleteButton redirect={props.options?.deleteRedirect ?? false} />
    </Datagrid>
  </List>
);
