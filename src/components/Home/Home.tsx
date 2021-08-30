import React,{useState} from 'react';
import './Home.css'

import HomeHeader from '../HomeHeader/HomeHeader';
import HomeAppBar from '../HomeAppBar/HomeAppBar';
import HomeUserProfile from '../HomeUserProfile/HomeUserProfile';
import HomeTaskDragger from '../HomeTaskDragger/HomeTaskDragger';
import HomePopover from '../HomePopover/HomePopover';

const Home: React.FunctionComponent = () => {
    const [searchValue,setSearchValue] = useState('')

    const handleSearchChange = (searchString: string) => {
        setSearchValue(searchString)
    }
    return (
        <div className="home">
            <div className="header flex">
                <HomeHeader />
            </div>
            <div className="appBar flex">
                <HomeAppBar />
            </div>
            <div className="userProfile flex">
                <HomeUserProfile searchValue={searchValue} handleSearchChange={handleSearchChange} />
            </div>
            <div className="popover flex">
                <HomePopover searchValue={searchValue} handleSearchChange={handleSearchChange}/>
            </div>
            <div className="flex tasksDragger">
                <HomeTaskDragger searchValue={searchValue}/>
            </div>
        </div>
    );
}

export default Home;
