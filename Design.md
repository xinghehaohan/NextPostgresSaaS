**Product Requirements: Detailed User Experience**

**Overview**: We are building a stock analysis platform inspired by Morningstar, focusing specifically on providing investment insights for individual stocks, analysts, and user ratings. The product will have features for viewing detailed analysis, browsing stocks by sector, and getting actionable insights in an easy-to-navigate interface.

**1. User Roles**
   - **Guest Users**: Can explore stock ratings, view partial analyst reports, and browse stock details.
   - **Registered Users**: Access full reports, add stocks to watchlists, interact with the community, and customize notifications.
   - **Analysts**: Contribute stock ratings, post detailed analyses, and track their content's performance.

**2. Core Features**
   - **Stock Listings Page**: Display a list of stock analysis reports, similar to the Seeking Alpha interface provided.
     - **Columns**: Symbol, Sector, Analyst, Coverage Date, Rating, and Analysis Title.
     - Users can search by **Symbols, Analysts, Keywords**, and filter by sector or rating (e.g., "Buy", "Strong Buy").
   - **Stock Details & Analysis**: When clicking on a row, users will be redirected to a detailed page with the full analysis.
     - **Details**: Show price trends, sector details, analyst insights, and historical ratings.
     - **Interactive Tools**: Include price charts, analysis sentiment (user ratings and comments), and related news.
   - **Analyst Profiles**: Users can click on the Analyst name to see their profile and a list of all their analyses.
     - **Profile Info**: Show a brief bio, past analyses, average rating performance, and followers.
   - **Watchlist & Alerts**:
     - Registered users can create a watchlist of specific stocks to monitor.
     - Set alerts for new analyst reports or significant rating changes.
   - **Community & Comments**: Users can comment on analyses and discuss particular insights.
     - Like/dislike comments, upvote/downvote analysis, and follow other users/analysts.

**3. User Interface Requirements**
   - **Stock Listings Page**: A clean, tabular layout with easy filtering and sorting options.
   - **Search Functionality**: Type-ahead suggestions when searching by stock symbols or analyst names.
   - **Responsive Design**: Adaptable to desktop, tablet, and mobile.
   - **Clear Call-to-Actions**: Prominent buttons to register, log in, and follow stocks or analysts.

**4. Technical Requirements**
   - **Performance**: The table listing stocks should load quickly, with lazy loading/pagination for seamless browsing.
   - **SEO**: Optimized for search engines to attract organic traffic, focusing on stock names and trending analyses.
   - **Authentication**: Social logins, email/password authentication, and role-based access control for analyst functionality.

**Backend Core Functionalities & API Instructions**

**1. Core Functionalities**
   - **User Management**: Registration, login, role assignment (guest, user, analyst), and profile management.
   - **Stock Information Retrieval**: Integrate with an external API (e.g., Yahoo Finance) to pull stock data like current price, historical prices, sector details, etc.
   - **Analysis Management**: CRUD operations for analyses that analysts contribute.
   - **Watchlist Management**: Allow users to add/remove stocks from their watchlist, and create notifications.
   - **Search & Filter**: Efficient search functionality for stocks, keywords, and analysts.
   - **Ratings & Comments**: Provide endpoints for users to rate analyses, add comments, and upvote/downvote.

**2. API Instructions**
   - **User APIs**:
     - **POST /api/register**: Create a new user.
     - **POST /api/login**: User login.
     - **GET /api/user/profile**: Fetch the user profile information.
     - **PUT /api/user/update**: Update user profile details.
   - **Stock APIs**:
     - **GET /api/stocks**: Retrieve a list of stocks, supports pagination, filtering (by sector, rating), and search query.
     - **GET /api/stocks/{symbol}**: Retrieve detailed stock information including the price chart, analysis, and related news.
   - **Analysis APIs**:
     - **GET /api/analysis**: Retrieve all analyses, with filters for ratings, sectors, or specific stocks.
     - **POST /api/analysis**: (Analyst only) Create a new analysis report.
     - **GET /api/analysis/{id}**: Retrieve a specific analysis.
   - **Watchlist & Alerts APIs**:
     - **POST /api/watchlist**: Add a stock to the user's watchlist.
     - **DELETE /api/watchlist/{symbol}**: Remove a stock from the watchlist.
     - **GET /api/watchlist**: Fetch all stocks in the user's watchlist.
   - **Comments & Community APIs**:
     - **POST /api/analysis/{id}/comment**: Add a comment to a specific analysis.
     - **PUT /api/analysis/{id}/upvote**: Upvote an analysis.
     - **DELETE /api/analysis/{id}/comment/{commentId}**: Delete a user's comment.

**Backend Technology Stack**
   - **Database**: PostgreSQL for storing user data, analysis content, watchlists, and interactions.
   - **ORM**: Drizzle for easy schema definition and type-safe database operations.
   - **API Framework**: Next.js API routes for backend services, ensuring efficient SSR for certain pages.
   - **State Management**: Zustand for stateful components, especially watchlist and analysis interactions.
   - **Authentication**: Integrate Clerk for user registration and authentication management.

   CREATE TABLE stocks_analysis (
    sector VARCHAR(255),
    analyst VARCHAR(255),
    coverage_date DATE,
    rating VARCHAR(255),
    analysis TEXT
);

CREATE TABLE top_performing (
  id SERIAL PRIMARY KEY,
  rank INTEGER NOT NULL,
  analyst VARCHAR(255) NOT NULL,
  analyst_img TEXT,
  success_rate DECIMAL(5,2) NOT NULL,
  average_return DECIMAL(6,2) NOT NULL,
  number_of_ratings INTEGER NOT NULL,
  latest_coverage_stock VARCHAR(10),
  latest_coverage_article TEXT,
  coverage_date DATE,
  latest_rating VARCHAR(20)
);


