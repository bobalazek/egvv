import Link from 'next/link';
import { Table } from '@mantine/core';
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
                  <a>{event.name}</a>
                </Link>
              </td>
              <td>{event.laps}</td>
              <td>{event.lapDistance}m</td>
              <td>
                <Link href={`/circuits/${event.circuit.slug}`} passHref>
                  <a>{event.circuit.name}</a>
                </Link>
                {event.circuitLayout && <span> ({event.circuitLayout})</span>}
              </td>
              <td>
                {raceDate.toLocaleDateString()} {raceDate.toLocaleTimeString()} UTC
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
