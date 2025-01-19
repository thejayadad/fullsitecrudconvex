# CREATE THE APP
- package.json | global.css | page.tsx

# DATABASE AUTHENICATION
- convex
- clerk
- webtoken
- npm run dev

# HERO OR LANDING PAGE
- build it out
- setup link to direct customer
- build logo

# DASHBOARD SIDEBAR
- setup the layout
- add the components folder then sidebar
- bringinto the layout
- make sure it toggles properly



# CREATE DOCUMENT
- update the schema
- documents api
- bring into the dashboardPage
- test it out
- add the ability to get documents

# ACTION ITEM
- build out component
- starthere

```
'use client'
import React from 'react'
import { IconType } from 'react-icons';


interface Props {
    label: string;
    onClick: () => void;
    icon: IconType;
}

const ActionItem = ({label, onClick, icon: Icon}:Props) => {
  const active = false
    return (
    <div
    style={{ paddingLeft: '12px' }}
    onClick={onClick}
    className={`group min-h-[27px] text-sm py-1 pr-3 w-full flex items-center font-medium cursor-pointer ${
        active ? 'text-primary' : 'text-muted-foreground'
      } hover:bg-primary/5`}
    >
        <Icon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        <span
        className='truncate'
        > {label}</span>
    </div>
  )
}

export default ActionItem
```

- be sure to add the icon
- give some mr as needed
- now add the search icon
- add isSearch into props

# NOTE LIST
- add a component
- bring into the sidebar
- style with a title make sure site still works
- update the list component

# ARCHIVE 
- update the api
- add to the noteItem
- check db to make sure it toggles
- once finish test it out

# SEARCH FUNCTIONALITY
- update the action item
- update the notelist
- check the backend function
- update the actionItem component


# NAVBAR
- add header component
- bring into the doc page
- add the api
- add the header
- add then title form
- show it along the way

# TOOLBAR
- style the single document page
- add toolbar component
- start off with the styling
- install npm i emoji-picker-react
- create icon picker component in component folder
- style the toolbar
- add the image preview

# ADD COVER BUTTON
- create hook named use-cover-image.tsx
- go to edgestore
- create project
- add .env data to the file
- click continue in docs
- follow the docs in setup
- then do image component
- install dependencies
- add to component folder
- update the height and width

# EDITOR COMPONENT
