const options = [
    {
        id: 0,
        label: 'Months',
        url: '/data/cpmu',
        delay: 2000
    },{
        id: 1,
        label: 'Quarter',
        url: '/data/cpmu?agregate=quarter',
        delay: 1500
    },{
        id: 2,
        label: 'Year',
        url: '/data/cpmu?agregate=year',
        delay: 500
    }
];

export default options;
