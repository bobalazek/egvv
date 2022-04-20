import { Anchor, Table } from '@mantine/core';
import { EventSession } from '@prisma/client';
import Link from 'next/link';

export function EventSessionsTable({ eventSessions }: { eventSessions: EventSession[] }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Start</th>
          <th>End</th>
        </tr>
      </thead>
      <tbody>
        {eventSessions.map((eventSession) => {
          const startDate = new Date(eventSession.startAt as unknown as string);
          const endDate = eventSession.endAt ? new Date(eventSession.endAt as unknown as string) : null;

          return (
            <tr key={eventSession.id}>
              <td>
                <Link href={`/event-sessions/${eventSession.slug}`} passHref>
                  <Anchor>{eventSession.name}</Anchor>
                </Link>
              </td>
              <td>
                {startDate.toLocaleDateString()} {startDate.toLocaleTimeString()} <small>(track time)</small>
              </td>
              <td>
                {endDate && (
                  <>
                    {endDate.toLocaleDateString()} {endDate.toLocaleTimeString()} <small>(track time)</small>
                  </>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
