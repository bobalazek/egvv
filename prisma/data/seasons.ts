const data: { slug: string; name: string; seriesSlug: string }[] = [];

// Formula 1
for (let year = 1950; year <= 2022; year++) {
  data.push({
    slug: year + '-formula-one-world-championship',
    name: year + ' Formula One World Championship',
    seriesSlug: 'formula-1',
  });
}

// GP2 Series
for (let year = 2005; year <= 2016; year++) {
  data.push({
    slug: year + '-gp2-series-world-championship',
    name: year + ' GP2 World Championship',
    seriesSlug: 'gp2-series',
  });
}

// Formula 2
for (let year = 2017; year <= 2022; year++) {
  data.push({
    slug: year + '-formula-2-world-championship',
    name: year + ' Formula 2 World Championship',
    seriesSlug: 'formula-2',
  });
}

// GP3 Series
for (let year = 2010; year <= 2018; year++) {
  data.push({
    slug: year + '-gp3-series-world-championship',
    name: year + ' GP3 World Championship',
    seriesSlug: 'gp3-series',
  });
}

// Formula 3
for (let year = 2019; year <= 2022; year++) {
  data.push({
    slug: year + '-formula-3-world-championship',
    name: year + ' Formula 3 World Championship',
    seriesSlug: 'formula-3',
  });
}

// W Series
for (let year = 2019; year <= 2022; year++) {
  data.push({
    slug: year + '-w-series-world-championship',
    name: year + ' W Series World Championship',
    seriesSlug: 'w-series',
  });
}

// Formula E
for (let year = 2014; year <= 2022; year++) {
  data.push({
    slug: year + '-formula-e-world-championship',
    name:
      year +
      '-' +
      (year + 1).toString().slice(-2) +
      ' Formula E World Championship',
    seriesSlug: 'formula-e',
  });
}

// Extreme E
for (let year = 2021; year <= 2022; year++) {
  data.push({
    slug: year + '-extreme-e-world-championship',
    name: year + ' Extreme E World Championship',
    seriesSlug: 'extreme-e',
  });
}

// Moto GP
for (let year = 1949; year <= 2022; year++) {
  data.push({
    slug: year + '-motogp-world-championship',
    name: year + ' MotoGP World Championship',
    seriesSlug: 'motogp',
  });
}

// Moto2
for (let year = 2010; year <= 2022; year++) {
  data.push({
    slug: year + '-moto2-world-championship',
    name: year + ' Moto2 World Championship',
    seriesSlug: 'moto2',
  });
}

// Moto3
for (let year = 2012; year <= 2022; year++) {
  data.push({
    slug: year + '-moto3-world-championship',
    name: year + ' Moto3 World Championship',
    seriesSlug: 'moto3',
  });
}

// Moto3
for (let year = 2019; year <= 2022; year++) {
  data.push({
    slug: year + '-motoe-world-cup',
    name: year + ' MotoE World Cup',
    seriesSlug: 'moto3',
  });
}

export default data;
