import { List, Datagrid, TextField, ResourceComponentProps, DateField, ReferenceField } from 'react-admin';

export const SeasonList = (props: ResourceComponentProps) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="slug" />
      <TextField source="name" />
      <TextField source="year" />
      <DateField source="startAt" />
      <DateField source="endAt" />
      <ReferenceField source="seriesId" reference="Series">
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
);
