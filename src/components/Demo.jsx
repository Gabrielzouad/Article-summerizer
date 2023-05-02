import React from "react"
import { useState, useEffect } from "react"
import { copy, linkIcon, loader, tick } from "../assets"
import { useLazyGetSummaryQuery } from "../services/article"

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  })

  const [allArticles, setAllArticles] = useState([])
  const [copied, setCopied] = useState("")
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery()

  useEffect(() => {
    const savedArticles = localStorage.getItem("articles")
    if (savedArticles) {
      setAllArticles(JSON.parse(savedArticles))
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data } = await getSummary({ articleUrl: article.url })
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary }
      const updatedAllArticles = [...allArticles, newArticle]

      setArticle(newArticle)
      setAllArticles(updatedAllArticles)

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles))
    }
  }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl)
    navigator.clipboard.writeText(copyUrl)

    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  return (
    <section className='mt-16 w-full max-w-xl '>
      {/* <h1 className='text-3xl font-bold'>Demo</h1> */}
      <div className='flex flex-col w-full gap-2'>
        <form action='' onSubmit={handleSubmit} className='relative flex justify-center items-center'>
          <img src={linkIcon} alt='link icon' className='absolute left-0 my-0 ml-3 w-5' />
          <input type='url' value={article.url} onChange={(e) => setArticle({ ...article, url: e.target.value })} required className='url_input peer' placeholder='Skriv inn en URL her' />
          <button type='submit' className='submit_btn px-6 peer-focus:border-gray-700 peer-focus:text-gray-700'>
            Send
          </button>
        </form>
        <div className='flex- flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.map((article, index) => (
            <div key={`link-${index}`} onClick={() => setArticle(article)} className='link_card'>
              <div className='copy_btn' onClick={() => handleCopy(article.url)}>
                <img src={copied === article.url ? tick : copy} alt='copy icon' className='w-[40%] h-[40%] object-contain' />
              </div>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>{article.url}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='my-10 max-w-full flex justify-center items-center '>
        {isFetching ? (
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : error ? (
          <p className='text-red-500 text-sm font-medium'>
            Noe gikk galt
            <br />
            <span className='font-satoshi font-normal text-gray-700'>{error?.data?.error}</span>
          </p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default Demo
