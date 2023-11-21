/*
sceneSynopsis contains all the components that makes up a scene.
Players are not included as they are added to scenes at show time.
*/

export const sceneSynopsis = [
  {
    sceneId: 1,
    name: 'The Dark Forest',
    cast: [
      {
        what: 'Goblin',
        who: '',
        category: 'antagonist',
        notes: 'Angry and violent.'
      },
      {
        what: 'Human',
        who: 'Walter',
        category: 'support',
        notes: ''
      },
      {
        what: 'Human',
        who: 'Matilda',
        category: 'support',
        notes: 'Calculating. Cannot be trusted.'
      }
    ],
    sceneryBackdrop: ['transparent'],
    sceneryFlats: ['well', 'townhouse', 'clock tower', 'statue'],
    props: ['treasureBox', 'sword', 'dagger', 'coinsSilver']
  },
  {
    sceneId: 2,
    name: 'The Hill of Difficulty',
    cast: [
      {
        what: 'Ghost',
        who: '',
        category: 'antagonist',
        notes: 'Attacks immediately.'
      },
      {
        what: 'Sheep',
        who: '',
        category: 'support',
        notes: ''
      },
      {
        what: 'Giant',
        who: '',
        category: 'antagonist',
        notes: 'Clumsy.'
      }
    ],
    sceneryBackdrop: ['moon', 'comet'],
    sceneryFlats: ['hill', 'trees', 'cairn'],
    props: ['arcana','spear', 'dagger', 'coinsCopper']
  },
  {
    sceneId: 3,
    name: 'The Panther, the Lion, and the Wolf',
    cast: [
      {
        what: 'Panther',
        who: '',
        category: 'antagonist',
        notes: 'Aloof .'
      },
      {
        what: 'Lion',
        who: '',
        category: 'antagonist',
        notes: 'Sly.'
      },
      {
        what: 'Wolf',
        who: '',
        category: 'antagonist',
        notes: 'Dressed in sheep\'s clothing.'
      }
    ],
    sceneryBackdrop: ['moon', 'clouds'],
    sceneryFlats: ['forest', 'statue', 'temple'],
    props: ['arcana','chain', 'treasureChest', 'coinsGold']
  },
]