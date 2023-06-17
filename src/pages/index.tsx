import { type NextPage } from "next";
import InfiniteTweetList from "~/components/InfiniteTweetList";
import NewTweetForm from "~/components/NewTweetForm";
import { api } from "~/utils/api";


const Home: NextPage = () => {
  return <>
    <header className="sticky top-0 z-10 border-b bg-white pt-2">
      <h1 className="mb-2 px-4 text-lg font-bold">
        Home
      </h1>
    </header>

    <NewTweetForm />
    <RecentTweet />
  </>
};

function RecentTweet() {
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery({}, {
    getNextPageParam: (lastPage) => {
      lastPage.nextCursor
    }
  })

  return (
    <InfiniteTweetList
      tweets={tweets.data?.pages.flatMap((page) => page.tweet)}
      isError={tweets.isError}
      isLoading={tweets.isLoading}
      hasMore={tweets.hasNextPage}
      fetchNextPage={tweets.fetchNextPage}
    />
  )
}

export default Home;