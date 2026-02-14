// 1. count all the records-
const result = db.User.aggregate([
  {
    $count: "total users",
  },
]);

// 2. get all active users and count all active users-
[
  {
    $match: {
      isActive: true,
    },
  },
  {
    $count: "Active users",
  },
]

// 3. get all in active users with count
[
  ({
    $match: {
      isActive: false,
    },
  },
  {
    $count: "Offline users",
  })
];


// // 3. group the people based on the gender
[
  {
    $group: {
      _id: "$gender",
    },
  },
][
  // 4. find average age among all data
  {
    $group: {
      _id: null,
      AverageAge: {
        $avg: "$age",
      },
    },
  }
][
  // 5 group people by age

  {
    $group: {
      _id: "$age",
    },
  }
][
  // 5 group people by age and count
  ({
    $group: {
      _id: "$age",
    },
  },
  {
    $count: "Age",
  })
]

// 6. group people by gender and calculate average of all group
[
  {
    $group: {
      _id: "$gender",
      averageAge: {
        $avg: "$age",
      },
    },
  }
];

// // 1. count all the records-
// [
//   {
//     $count: 'total users'
//   }
// ]

// 2. get all active users and count all active users-
// [
//   {
//     $match: {
//       isActive: true
//     }
//   },
//   {
//     $count: "Active users"
//   }
// ]

// // 3. get all in active users with count
// [
//   {
//     $match: {
//       isActive: false
//     }
//   }, {
//     $count: 'Offline users'
//   }
// ]

// // 3. group the people based on the gender
// [
//   {
//     $group: {
//       _id: "$gender"
//     }
//   }
// ]

// 4. find average age among all data
// [
//   {
//     $group: {
//       _id: null,
//       AverageAge: {
//         $avg: "$age"
//       }
//     }
//   }
// ]

// // 5 group people by age
// [
//   {
//     $group: {
//       _id: "$age"
//     }
//   }
// ]

// 5. group people by age and count
// [
//   {
//     $group: {
//       _id: "$age"
//     }
//   },
// {
//   $count: "Age"
// }
// ]

// // 6. group people by gender and calculate average of all group
// [
//   {
//     $group: {
//       _id: "$gender",
//       averageAge: {
//         $avg: "$age"
//       }
//     }
//   }
// ]

// 7. group the user by gender and count users in each group
// [
//   {
//     $group: {
//       _id: "$gender"
//     }
//   }
// ]

// 8. List the favorite fruits among users and count also find for each group.
// [
//   {
//     $group: {
//       _id: "$favoriteFruit",
//       count: {
//         $sum: 1
//       }
//     }
//   }
// ]


// // 8. List the top 5 most common favorite fruits among users.
// [
//   {
//     $group: {
//       _id: "$favoriteFruit",
//       count: {
//         $sum: 1
//       },
//     }
//   },
//   {
//     $sort: {
//       count: -1
//     }
//   },
//   {
//     $limit: 2
//   }
// ]

// 9. Find the total number of males and females.
// [
//   {
//     $group: {
//       _id: "$gender",
//       count: {
//         $sum: 1
//       }
//     }
//   }
// ]

// [
//   {
//     $group: {
//       _id: "$gender",
//       count: {
//         $count: "$gender"
//       }
//     }
//   }
// ]


// 4. Which country has the highest number of registered users ?
// [
//   {
//     $group: {
//       _id: "$company.location.country",
//     count: {
//       $sum: 1
//     }
//     }
//   },
//   {
//     $sort: {
//       count: -1
//     }
//   },
//   {
//     $limit: 2
//   }
// ]

// // 5. List all eye color present in the collection ?
// [
//   {
//     $group: {
//       _id: "$eyeColor",
//       count: {
//         $sum: 1
//       }
//       }
//     }
// ]

// 6. What is the average number of tags per user
[
  {
    $group: {
      _id: "$tags"
    }
  }
]