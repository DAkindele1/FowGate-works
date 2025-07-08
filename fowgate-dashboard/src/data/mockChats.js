const mockChats = [
  {
    id: 1,
    name: 'Enomfon Okon',
    avatar: 'https://i.pravatar.cc/100?img=1',
    time: '9:42 AM',
    lastMessage: 'Bro, it has been a while. The holiday is going well',
    members: ['Enomfon Okon', 'You'],
    messages: [
      { sender: 'Enomfon Okon', text: 'Bro, how is the holiday going? ', time: '9:40 AM' },
      { sender: 'You', text: 'Bro, it has been a while. The holiday is going well', time: '9:42 AM' },
    ],
  },
  {
    id: 2,
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/100?img=2',
    time: '9:10 AM',
    lastMessage: 'I\'ll make sure to do that.',
    members: ['John Doe', 'You'],
    messages: [
      { sender: 'John Doe', text: 'Hey, how\'s your mom doing?', time: '8:58 AM' },
      { sender: 'You', text: 'She\'s doing great. Thanks for asking.', time: '9:00 AM' },
      { sender: 'John Doe', text: 'That\'s good. Greet her for me', time: '9:04 AM' },
      { sender: 'You', text: 'I\'ll make sure to do that', time: '9:10 AM' },
    ],
  },
  {
    id: 3,
    name: 'JohnPaul Emmanuel',
    avatar: 'https://i.pravatar.cc/100?img=3',
    time: 'Yesterday',
    lastMessage: 'Going home now bro',
    members: ['JohnPaul Emmanuel', 'You'],
    messages: [
      { sender: 'JohnPaul Emmanuel', text: 'Going home now bro', time: '4:12 PM' },
    ],
  },
{
  id: 4,
  name: 'Dev Team',
  avatar: 'https://i.pravatar.cc/100?img=5',
  time: 'Today',
  lastMessage: 'Standup meeting at 10?',
  members: ['You', 'James', 'Joshua', 'Miracle'],
  avatarMap: {
    James: 'https://i.pravatar.cc/100?img=6',
    Joshua: 'https://i.pravatar.cc/100?img=2',
    Miracle: 'https://i.pravatar.cc/100?img=3',
  },
  messages: [
    { sender: 'James', text: 'Standup meeting at 10?', time: '9:30 AM' },
    { sender: 'Joshua', text: 'Works for me!', time: '9:31 AM' },
    { sender: 'Miracle', text: '👍', time: '9:32 AM' },
  ],
},
  {
    id: 5,
    name: 'Project Alpha',
    avatar: 'https://i.pravatar.cc/100?img=4',
    time: 'Last week',
    lastMessage: 'Let\'s finalize the design.',
    members: ['You', 'Jane', 'Yve'],
    avatarMap: {
      Jane: 'https://i.pravatar.cc/100?img=7',
      Yve: 'https://i.pravatar.cc/100?img=8',
    },
    messages: [
      { sender: 'Jane', text: 'Can we finalize the design by Friday?', time: 'Last week' },
      { sender: 'You', text: 'Yes, I\'ll send the updates by then.', time: 'Last week' },
      { sender: 'Yve', text: 'Great, looking forward to it', time: 'Last week' },
    ],
  },
];

export default mockChats;
