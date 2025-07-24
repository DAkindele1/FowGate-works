const mockChats = [
  {
    id: 1,
    name: 'Enomfon Okon',
    avatar: 'https://i.pravatar.cc/100?img=1',
    time: '9:42 AM',
    lastMessage: 'Bro, it has been a while. The holiday is going well',
    isOnline: true,
    pinned: true,
    members: ['Enomfon Okon', 'You'],
    messages: [
      { sender: 'Enomfon Okon', text: 'Bro, how is the holiday going?', time: '9:40 AM' },
      { sender: 'You', text: 'Bro, it has been a while. The holiday is going well', time: '9:42 AM', status: Math.random() > 0.5 ? 'read' : 'delivered' },
    ],
    files: {
      pdf: [{ name: 'itinerary.pdf', url: '/files/itinerary.pdf' }],
      jpg: [{ name: 'beach.jpg', url: '/files/beach.jpg' }],
    },
  },
  {
    id: 2,
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/100?img=2',
    time: '9:10 AM',
    lastMessage: "I'll make sure to do that.",
    isOnline: false,
    pinned: false,
    members: ['John Doe', 'You'],
    messages: [
      { sender: 'John Doe', text: "Hey, how's your mom doing?", time: '8:58 AM' },
      { sender: 'You', text: "She's doing great. Thanks for asking.", time: '9:00 AM' },
      { sender: 'John Doe', text: "That's good. Greet her for me", time: '9:04 AM' },
      { sender: 'You', text: "I'll make sure to do that", time: '9:10 AM', status: Math.random() > 0.5 ? 'read' : 'delivered' },
    ],
    files: {
      doc: [{ name: 'greeting-letter.doc', url: '/files/greeting-letter.doc' }],
    },
  },
  {
    id: 3,
    name: 'JohnPaul Emmanuel',
    avatar: 'https://i.pravatar.cc/100?img=3',
    time: 'Yesterday',
    lastMessage: 'Going home now bro',
    isOnline: true,
    pinned: false,
    members: ['JohnPaul Emmanuel', 'You'],
    messages: [
      { sender: 'JohnPaul Emmanuel', text: 'Going home now bro', time: '4:12 PM' },
    ],
    files: {
      mp3: [{ name: 'voice-note.mp3', url: '/files/voice-note.mp3' }],
    },
  },
  {
    id: 4,
    name: 'Dev Team',
    avatar: 'https://i.pravatar.cc/100?img=5',
    time: 'Today',
    lastMessage: 'Standup meeting at 10?',
    isOnline: false,
    pinned: true,
    members: ['You', 'James', 'Joshua', 'Miracle'],
    avatarMap: {
      James: 'https://i.pravatar.cc/100?img=6',
      Joshua: 'https://i.pravatar.cc/100?img=2',
      Miracle: 'https://i.pravatar.cc/100?img=3',
    },
    files: {
      jpg: [
        { name: 'screenshot.jpg', url: '/files/screenshot.jpg' },
        { name: 'design.jpg', url: '/files/design.jpg' },
      ],
      mp3: [
        { name: 'meeting-audio.mp3', url: '/files/meeting-audio.mp3' },
      ],
      mp4: [
        { name: 'demo.mp4', url: '/files/demo.mp4' },
      ],
      pdf: [
        { name: 'project-brief.pdf', url: '/files/project-brief.pdf' },
      ],
      doc: [
        { name: 'notes.doc', url: '/files/notes.doc' },
      ],
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
    lastMessage: "Let's finalize the design.",
    isOnline: true,
    pinned: false,
    members: ['You', 'Jane', 'Yve'],
    avatarMap: {
      Jane: 'https://i.pravatar.cc/100?img=7',
      Yve: 'https://i.pravatar.cc/100?img=8',
    },
    messages: [
      { sender: 'Jane', text: 'Can we finalize the design by Friday?', time: 'Last week' },
      { sender: 'You', text: "Yes, I'll send the updates by then.", time: 'Last week', status: Math.random() > 0.5 ? 'read' : 'delivered' },
      { sender: 'Yve', text: 'Great, looking forward to it', time: 'Last week' },
    ],
    files: {
      pdf: [{ name: 'alpha-design-specs.pdf', url: '/files/alpha-design-specs.pdf' }],
      mp4: [{ name: 'walkthrough.mp4', url: '/files/walkthrough.mp4' }],
    },
  },
];

export default mockChats;
