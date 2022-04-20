import { Table } from '@mantine/core';

import { DriverStandingInterface } from '../../interfaces/driver-standing-interface';

export function DriverStandingsTable({ driverStandings }: { driverStandings: DriverStandingInterface[] }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Position</th>
          <th>Name</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {driverStandings.map((driverStanding) => {
          const fullName = `${driverStanding.seasonDriver.driver.firstName} ${driverStanding.seasonDriver.driver.lastName}`;
          return (
            <tr key={driverStanding.seasonDriver.id}>
              <td>{driverStanding.position}</td>
              <td>{fullName}</td>
              <td>{driverStanding.points}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
