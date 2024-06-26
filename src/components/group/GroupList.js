import React from 'react'


function GroupListItem({listItem}){
    return (
        <li key={listItem.index}>
            {listItem.groupName} - Created by {listItem.GroupCreator}
        </li>
    )
}

export default function GroupList() {
    const dummyList = [
        // { groupName: "Tech Enthusiasts", GroupCreator: "John Doe" },
        // { groupName: "Bookworms Club", GroupCreator: "Jane Smith" },
        // { groupName: "Travel Buddies", GroupCreator: "Alice Wilson" },
        // { groupName: "Foodies Unite", GroupCreator: "Bob Johnson" },
        // { groupName: "Movie Club", GroupCreator: "Emily Jones" },
        // { groupName: "Fitness Fanatics", GroupCreator: "David Miller" },
        // { groupName: "Gaming Guild", GroupCreator: "Sarah Lee" },
        // { groupName: "Nature Lovers", GroupCreator: "Michael Brown" },
        // { groupName: "Music Enthusiasts", GroupCreator: "Amanda Garcia" },
        // { groupName: "Art and Design Collective", GroupCreator: "Christopher Davis" },
        // { groupName: "DIY and Crafts Corner", GroupCreator: "Jennifer Hernandez" },
        // { groupName: "Language Learning Partners", GroupCreator: "William Robinson" },
        // { groupName: "Finance and Investing Club", GroupCreator: "Elizabeth Walker" },
        // { groupName: "Cooking and Baking Enthusiasts", GroupCreator: "Matthew Allen" },
        // { groupName: "Productivity and Goal Setting Group", GroupCreator: "Katherine Young" },
      ];
  return (
    <div className=''>
        <ul className=''>
            {
                dummyList.map((listItem,index)=>(
                    <GroupListItem key={index} listItem={listItem}/>
                ))
            }
        </ul>
    </div>
  )
}
