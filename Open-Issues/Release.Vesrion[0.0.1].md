1. Frontend

   1. Find Mentor Page

      1. Not able to see certain fields when we it is phone screen
      2. in mobile routing is not happeing
      3. Issue in below code (search issue)

   ```javascript
   const searchedFilter = data.mentors[0]?.filter((item) => {
   	const companies = (item.company || "").toLowerCase();
   	// Now, companies will be an empty string if item.company is undefined or null

   	return companies.includes(search.toLowerCase());
   });
   ```

   2. let the icon and profile photo be on center

2. Backend
