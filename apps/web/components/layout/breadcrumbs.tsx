import { Breadcrumbs as MantineBreadcrumbs, Anchor, Container } from '@mantine/core';

interface BreadcrumbsProps {
  links: { href?: string; label: string }[];
}

export function Breadcrumbs({ links }: BreadcrumbsProps) {
  return (
    <div
      style={{
        paddingTop: 10,
        paddingBottom: 10,
        borderBottom: '1px solid #eee',
      }}
    >
      <Container>
        <MantineBreadcrumbs>
          {links.map((link, index) => {
            if (!link.href) {
              return <span key={index}>{link.label}</span>;
            }

            return (
              <Anchor href={link.href} key={index}>
                {link.label}
              </Anchor>
            );
          })}
        </MantineBreadcrumbs>
      </Container>
    </div>
  );
}
