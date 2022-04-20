import Link from 'next/link';
import { Anchor, Table } from '@mantine/core';
import { Event, Circuit } from '@prisma/client';

export function EventsTable({ events }: { events: (Event & { circuit: Circuit })[] }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Round</th>
          <th>Name</th>
          <th>Laps</th>
          <th>Lap distance</th>
          <th>Circuit</th>
          <th>Race</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => {
          const raceDate = new Date(event.raceAt as unknown as string);
          return (
            <tr key={event.id}>
              <td>{event.round}</td>
              <td>
                <Link href={`/events/${event.slug}`} passHref>
                  <Anchor>{event.name}</Anchor>
                </Link>
              </td>
              <td>{event.laps}</td>
              <td>{event.lapDistance}m</td>
              <td>
                <Link href={`/circuits/${event.circuit.slug}`} passHref>
                  <Anchor>{event.circuit.name}</Anchor>
                </Link>
                {event.circuitLayout && <span> ({event.circuitLayout})</span>}
              </td>
              <td>
                {raceDate.toLocaleDateString()} {raceDate.toLocaleTimeString()} <small>(track time)</small>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
