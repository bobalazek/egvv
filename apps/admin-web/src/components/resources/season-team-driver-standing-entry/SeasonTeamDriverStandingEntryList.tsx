import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  DateField,
  ShowButton,
  EditButton,
  DeleteButton,
  ListProps,
} from 'react-admin';

export const SeasonTeamDriverStandingEntryList = (props: ListProps) => (
  <List
    sort={{
      field: 'points',
      order: 'asc',
    }}
    {...props}
  >
    <Datagrid>
      <TextField source="points" />
      <DateField source="dateAt" />
      <TextField source="note" />
      <ReferenceField source="seasonTeamDriverId" reference="SeasonTeamDriver">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="eventSessionId" reference="EventSession">
        <TextField source="name" />
      </ReferenceField>
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
