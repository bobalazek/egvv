const data: {
  slug: string;
  name: string;
  seriesSlug: string;
  year: number;
  startAt: string;
}[] = [];

// Formula 1
for (let year = 1950; year <= 2022; year++) {
  data.push({
    slug: 'f1-' + year,
    name: year + ' Formula One World Championship',
    year,
    startAt: year + '-01-01',
    seriesSlug: 'formula-1',
  });
}

// GP2 Series
for (let year = 2005; year <= 2016; year++) {
  data.push({
    slug: 'gp2-' + year,
    name: year + ' GP2 World Championship',
    year,
    startAt: year + '-01-01',
    seriesSlug: 'gp2-series',
  });
}

// Formula 2
for (let year = 2017; year <= 2022; year++) {
  data.push({
    slug: 'f2-' + year,
    name: year + ' Formula 2 World Championship',
    year,
    startAt: year + '-01-01',
    seriesSlug: 'formula-2',
  });
}

// GP3 Series
for (let year = 2010; year <= 2018; year++) {
  data.push({
    slug: 'gp3-' + year,
    name: year + ' GP3 World Championship',
    year,
    startAt: year + '-01-01',
    seriesSlug: 'gp3-series',
  });
}

// Formula 3
for (let year = 2019; year <= 2022; year++) {
  data.push({
    slug: 'f3-' + year,
    name: year + ' Formula 3 World Championship',
    year,
    startAt: year + '-01-01',
    seriesSlug: 'formula-3',
  });
}

// W Series
for (let year = 2019; year <= 2022; year++) {
  data.push({
    slug: 'w-series-' + year,
    name: year + ' W Series World Championship',
    year,
    startAt: year + '-01-01',
    seriesSlug: 'w-series',
  });
}

// Formula E
for (let year = 2014; year <= 2022; year++) {
  data.push({
    slug: 'fe-' + year,
    name: year + '-' + (year + 1).toString().slice(-2) + ' Formula E World Championship',
    year,
    startAt: year + '-01-01',
    seriesSlug: 'formula-e',
  });
}

// Extreme E
for (let year = 2021; year <= 2022; year++) {
  data.push({
    slug: 'extreme-e-' + year,
    name: year + ' Extreme E World Championship',
    year,
    startAt: year + '-01-01',
    seriesSlug: 'extreme-e',
  });
}

// MotoGP
for (let year = 1949; year <= 2022; year++) {
  data.push({
    slug: 'motogp-' + year,
    name: year + ' MotoGP World Championship',
    year,
    startAt: year + '-01-01',
    seriesSlug: 'motogp',
  });
}

// Moto2
for (let year = 2010; year <= 2022; year++) {
  data.push({
    slug: 'moto2-' + year,
    name: year + ' Moto2 World Championship',
    year,
    startAt: year + '-01-01',
    seriesSlug: 'moto2',
  });
}

// Moto3
for (let year = 2012; year <= 2022; year++) {
  data.push({
    slug: 'moto3-' + year,
    name: year + ' Moto3 World Championship',
    year,
    startAt: year + '-01-01',
    seriesSlug: 'moto3',
  });
}

// MotoE
for (let year = 2019; year <= 2022; year++) {
  data.push({
    slug: 'motoe-' + year,
    name: year + ' MotoE World Cup',
    year,
    startAt: year + '-01-01',
    seriesSlug: 'moto3',
  });
}

export default data;
