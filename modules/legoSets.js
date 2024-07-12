let legoSets = [
    { set_num: "001-1", name: "Gears", theme: "technic", img_url: "https://cdn.rebrickable.com/media/sets/001-1.jpg", year: 1965, num_parts: 43 },
    { set_num: "0011-2", name: "Town Mini-Figures", theme: "city", img_url: "https://cdn.rebrickable.com/media/sets/0011-2.jpg", year: 1979, num_parts: 12 },
    { set_num: "0011-3", name: "Castle 2 for 1 Bonus Offer", theme: "castle", img_url: "https://cdn.rebrickable.com/media/sets/0011-3.jpg", year: 1987, num_parts: 0 },
    { set_num: "0012-1", name: "Space Mini-Figures", theme: "space", img_url: "https://cdn.rebrickable.com/media/sets/0012-1.jpg", year: 1979, num_parts: 12 },
    { set_num: "0013-1", name: "Space Mini-Figures", theme: "space", img_url: "https://cdn.rebrickable.com/media/sets/0013-1.jpg", year: 1979, num_parts: 12 },
    { set_num: "0014-1", name: "Space Mini-Figures", theme: "space", img_url: "https://cdn.rebrickable.com/media/sets/0014-1.jpg", year: 1979, num_parts: 2 },
    { set_num: "0015-1", name: "Space Mini-Figures", theme: "space", img_url: "https://cdn.rebrickable.com/media/sets/0015-1.jpg", year: 1979, num_parts: 18 },
    { set_num: "0016-1", name: "Castle Mini Figures", theme: "castle", img_url: "https://cdn.rebrickable.com/media/sets/0016-1.jpg", year: 1979, num_parts: 15 },
    { set_num: "002-1", name: "4.5V Samsonite Gears Motor Set", theme: "technic", img_url: "https://cdn.rebrickable.com/media/sets/002-1.jpg", year: 1965, num_parts: 3 },
    { set_num: "002253963-1", name: "Legend of Chima: Corbeaux et Gorilles", theme: "chima", img_url: "https://cdn.rebrickable.com/media/sets/002253963-1.jpg", year: 2013, num_parts: 4 },
    { set_num: "003-1", name: "Master Mechanic Set", theme: "technic", img_url: "https://cdn.rebrickable.com/media/sets/003-1.jpg", year: 1966, num_parts: 403 },
    { set_num: "005-1", name: "Basic Building Set in Cardboard", theme: "basic", img_url: "https://cdn.rebrickable.com/media/sets/005-1.jpg", year: 1965, num_parts: 35 },
    { set_num: "005-2", name: "Discovery Set", theme: "technic", img_url: "https://cdn.rebrickable.com/media/sets/005-2.jpg", year: 1967, num_parts: 0 },
    { set_num: "00-6", name: "Special Offer", theme: "town", img_url: "https://cdn.rebrickable.com/media/sets/00-6.jpg", year: 1985, num_parts: 0 },
    { set_num: "010-1", name: "Basic Building Set in Cardboard", theme: "basic", img_url: "https://cdn.rebrickable.com/media/sets/010-1.jpg", year: 1965, num_parts: 57 },
    { set_num: "010-2", name: "Pre-School Set", theme: "pre-school", img_url: "https://cdn.rebrickable.com/media/sets/010-2.jpg", year: 1973, num_parts: 18 },
    { set_num: "010-3", name: "Basic Building Set", theme: "basic", img_url: "https://cdn.rebrickable.com/media/sets/010-3.jpg", year: 1968, num_parts: 77 },
    { set_num: "010423-1", name: "The Majestic Horse", theme: "creator", img_url: "https://cdn.rebrickable.com/media/sets/010423-1.jpg", year: 2023, num_parts: 0 },
    { set_num: "01-1", name: "Chain Links", theme: "technic", img_url: "https://cdn.rebrickable.com/media/sets/01-1.jpg", year: 1980, num_parts: 25 },
    { set_num: "011-1", name: "Basic Building Set", theme: "basic", img_url: "https://cdn.rebrickable.com/media/sets/011-1.jpg", year: 1968, num_parts: 145 },
    { set_num: "01-2", name: "Bulldozer Chain Links", theme: "technic", img_url: "https://cdn.rebrickable.com/media/sets/01-2.jpg", year: 1982, num_parts: 50 },
    { set_num: "02-1", name: "Extra Large Tires & Hubs", theme: "technic", img_url: "https://cdn.rebrickable.com/media/sets/02-1.jpg", year: 1982, num_parts: 4 },
    { set_num: "021-1", name: "Wheel Set", theme: "technic", img_url: "https://cdn.rebrickable.com/media/sets/021-1.jpg", year: 1966, num_parts: 183 },
    { set_num: "02-2", name: "Digger Bucket Assembly", theme: "technic", img_url: "https://cdn.rebrickable.com/media/sets/02-2.jpg", year: 1980, num_parts: 3 },
    { set_num: "022-1", name: "Basic Building Set", theme: "basic", img_url: "https://cdn.rebrickable.com/media/sets/022-1.jpg", year: 1968, num_parts: 110 },
    { set_num: "0241187567-1", name: "Ninjago: Build Your Own Adventure", theme: "ninjago", img_url: "https://cdn.rebrickable.com/media/sets/0241187567-1.jpg", year: 2015, num_parts: 74 },
    { set_num: "0241357594-1", name: "Star Wars: Build Your Own Adventure: Galactic Missions", theme: "star-wars", img_url: "https://cdn.rebrickable.com/media/sets/0241357594-1.jpg", year: 2019, num_parts: 70 },
    { set_num: "028-1", name: "Nursery Furniture", theme: "furniture", img_url: "https://cdn.rebrickable.com/media/sets/028-1.jpg", year: 1979, num_parts: 7 },
    ];

module.exports.initialize = () => {
    return new Promise((resolve, reject) => {
        // Simulating async initialization
        resolve();
    });
};

module.exports.getAllSets = () => {
    return new Promise((resolve, reject) => {
        resolve(legoSets);
    });
};

module.exports.getSetByNum = (set_num) => {
    return new Promise((resolve, reject) => {
        const set = legoSets.find(s => s.set_num === set_num);
        if (set) {
            resolve(set);
        } else {
            reject("Set not found");
        }
    });
};

module.exports.getSetsByTheme = (theme) => {
    return new Promise((resolve, reject) => {
        const sets = legoSets.filter(s => s.theme === theme);
        if (sets.length > 0) {
            resolve(sets);
        } else {
            reject("No sets found for theme");
        }
    });
};
