import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Team } from '@prisma/client';
import { gql, useQuery } from '@apollo/client';
import { TeamVehicle } from '../three/models/team-vehicle';

interface TeamVehiclesViewerProps {
  team: Team;
}

const TEAM_VEHICLE_ASSETS_QUERY = gql`
  query GetTeamVehicleAssets($teamSlug: String!) {
    teamVehicleAssets(teamSlug: $teamSlug) {
      url
      key
      name
    }
  }
`;

export function TeamVehiclesViewer(props: TeamVehiclesViewerProps) {
  const { loading, data, error } = useQuery(TEAM_VEHICLE_ASSETS_QUERY, {
    variables: {
      teamSlug: props.team.slug,
    },
  });
  const [teamVehicles, setTeamVehicles] = useState([]);

  useEffect(() => {
    if (!data) {
      return;
    }

    setTeamVehicles(data.teamVehicleAssets);
  }, [data]);

  if (loading) {
    return <>Loading ...</>;
  }

  if (error) {
    return <>Something went wrong</>;
  }

  return (
    <Canvas
      shadows
      gl={{
        toneMappingExposure: 0.7,
      }}
      style={{
        height: 600,
      }}
    >
      <OrbitControls autoRotate makeDefault />
      <ambientLight />
      <pointLight position={[4, 4, 4]} />
      {teamVehicles.map((teamVehicleProps, index) => {
        return <TeamVehicle key={index} url={teamVehicleProps.url} name={teamVehicleProps.name} />;
      })}
    </Canvas>
  );
}
