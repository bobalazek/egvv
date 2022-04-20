import { Table } from '@mantine/core';

import { TeamStandingInterface } from '../../interfaces/team-standing-interface';

export function TeamStandingsTable({ teamStandings }: { teamStandings: TeamStandingInterface[] }) {
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
        {teamStandings.map((teamStanding, index) => {
          return (
            <tr key={teamStanding.seasonTeam.id}>
              <td>{teamStanding.position}</td>
              <td>{teamStanding.seasonTeam.name}</td>
              <td>{teamStanding.points}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
