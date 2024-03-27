const nodes = [
  { id: 1, label: 'Node 1' },
  { id: 2, label: 'Node 2' },
  { id: 3, label: 'Node 3' },
  { id: 4, label: 'Node 4' },
  { id: 5, label: 'Node 5' },
  { id: 6, label: 'Node 6' },
  { id: 7, label: 'Node 7' },
  { id: 8, label: 'Node 8' },
]

// create an array with edges
const edges = [
  { from: 1, to: 8, arrows: { to: { enabled: true, scaleFactor: 0.8 } } },
  { from: 1, to: 3, arrows: { to: { enabled: true, scaleFactor: 0.8 } } },
  { from: 1, to: 2, arrows: { to: { enabled: true, scaleFactor: 0.8 } } },
  { from: 2, to: 4, arrows: { to: { enabled: true, scaleFactor: 0.8 } } },
  { from: 2, to: 5, arrows: { to: { enabled: true, scaleFactor: 0.8 } } },
  { from: 5, to: 6, arrows: { to: { enabled: true, scaleFactor: 0.8 } } },
  {
    from: 6,
    to: 7,
    arrows: { to: { enabled: true, scaleFactor: 0.8 } },
  },
]

export const visData = {
  nodes,
  edges,
}

export const visGraphData = {
  name: 'Node 1',
  path: 'Path To Node 1',
  type: 'component',
  roots: [
    {
      name: 'Node 3',
      path: 'Path To Node 3',
      type: 'page',
      roots: [],
      parents: [],
    },
    {
      name: 'Node 4',
      path: 'Path To Node 4',
      type: 'page',
      roots: [],
      parents: [],
    },
    {
      name: 'Node 7',
      path: 'Path To Node 7',
      type: 'page',
      roots: [],
      parents: [],
    },
    {
      name: 'Node 8',
      path: 'Path To Node 8',
      type: 'page',
      roots: [],
      parents: [],
    },
  ],
  parents: [
    {
      name: 'Node 2',
      path: 'Path To Node 2',
      type: 'component',
      roots: [
        {
          name: 'Node 4',
          path: 'Path To Node 4',
          type: 'page',
          roots: [],
          parents: [],
        },
        {
          name: 'Node 7',
          path: 'Path To Node 7',
          type: 'page',
          roots: [],
          parents: [],
        },
      ],
      parents: [
        {
          name: 'Node 4',
          path: 'Path To Node 4',
          type: 'component',
          roots: [],
          parents: [],
        },
        {
          name: 'Node 5',
          path: 'Path To Node 5',
          type: 'component',
          roots: [
            {
              name: 'Node 7',
              path: 'Path To Node 7',
              type: 'page',
              roots: [],
              parents: [],
            },
          ],
          parents: [
            {
              name: 'Node 6',
              path: 'Path To Node 6',
              type: 'component',
              roots: [
                {
                  name: 'Node 7',
                  path: 'Path To Node 7',
                  type: 'page',
                  roots: [],
                  parents: [],
                },
              ],
              parents: [
                {
                  name: 'Node 7',
                  path: 'Path To Node 7',
                  type: 'page',
                  roots: [],
                  parents: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Node 3',
      path: 'Path To Node 3',
      type: 'page',
      roots: [],
      parents: [],
    },
    {
      name: 'Node 8',
      path: 'Path To Node 8',
      type: 'page',
      roots: [],
      parents: [],
    },
  ],
}
