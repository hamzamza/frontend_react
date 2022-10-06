<div className="header">
    <div className="headerContainer">
        <div className="headerList">
            <div className="headerListItem active">
                <FontAwesomeIcon className="header-logo" icon={faBed} />
                <span>Stays</span>
            </div>
            <div className="headerListItem ">
                <FontAwesomeIcon className="header-logo" icon={faPlane} />
                <span>Flights</span>
            </div>

            <div className="headerListItem">
                <FontAwesomeIcon className="header-logo" icon={faCar} />
                <span>Car centeral</span>
            </div>

            <div className="headerListItem">
                <FontAwesomeIcon className="header-logo" icon={faBed} />
                <span>Attractions</span>
            </div>

            <div className="headerListItem">
                <FontAwesomeIcon className="header-logo" icon={faTaxi} />
                <span>Airroport taxis</span>
            </div>
        </div>
        <h1 className="headerTitle">A lifetime of discounts? it's genius</h1>
        <p className="headerDesc">
            Get rewarded for your travels unlick instant savings of 10% or more
            with a free lambooking account
        </p>
        <button className="headerBtn">Sign in / Regester</button>
        <div className="headerSearch">
            <div className="headerSearchItem">
                <FontAwesomeIcon className="search-logo" icon={faBed} />
                <input
                    type="text"
                    className="headerSearchInput"
                    placeholder="Where are you going ? "
                />
            </div>
            <div className="headerSearchItem">
                <FontAwesomeIcon className="search-logo" icon={faCalendarDays} />
                <span className="headerSearchText">date to date</span>
                <DateRange
                    className="Date active"
                    editableDateInputs={true}
                    onChange={(item) => {
                        setDate([item.selection]);
                        console.log(item.selection);
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                />
            </div>
            <div className="headerSearchItem">
                <FontAwesomeIcon className="search-logo" icon={faPerson} />
                <span className="headerSearchText">2 adults 2 children 1 room</span>
            </div>
            <div className="headerSearchItem">
                <button className="searchBtn">
                    <FontAwesomeIcon className="search-btn-logo" icon={faSearch} />
                    <span className="searchBtnSpan">Search</span>
                </button>
            </div>
        </div>
    </div>
</div>