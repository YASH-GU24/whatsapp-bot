const TextOnGif = require('text-on-gif');
const nodeHtmlToImage = require('node-html-to-image')

async function generate_tweet(name, content) {
  return nodeHtmlToImage({
    html: `<!DOCTYPE html>
  <html>
  <head>
    <title></title>
    <link rel="stylesheet" href="https://tweet-generator.vercel.app/tweet/assets/twitter_core.bundleTEST.css">
    <link rel="stylesheet" href="https://tweet-generator.vercel.app/tweet/assets/twitter_more_1.bundle.css">
    <link rel="stylesheet" href="https://tweet-generator.vercel.app/tweet/assets/style.css">
  </head>
  <body>
    <div class="tweet-container">
      <div class="tweet permalink-tweet js-actionable-user js-actionable-tweet js-original-tweet with-social-proof logged-in js-initial-focus focus">
        <div class="content clearfix">
          <div class="permalink-header">
            <a class="account-group js-account-group js-action-profile js-user-profile-link js-nav">
            <img class="avatar js-action-profile-avatar" src="https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png" alt="" id="pfpOutput">
            <span class="FullNameGroup">
            <strong class="fullname show-popup-with-id u-textTruncate" id="nameOutput">{{name}}</strong><span>&rlm;</span>
            <span class="UserNameBreak">&nbsp;</span></span><span class="username u-dir u-textTruncate" dir="ltr" data-aria-label-part="">@<b id="usernameOutput">{{name}}</b></span></a>
            <div class="follow-bar">
              <div class="user-actions btn-group not-following not-muting can-dm including  ">
                <span class="user-actions-follow-button js-follow-btn follow-button">
                <button type="button" class="
                  EdgeButton
                  EdgeButton--secondary
                  EdgeButton--medium 
                  button-text
                  follow-text" id="followOutput" style="display: none;">
                <span aria-hidden="true">Follow</span>
                <span class="u-hiddenVisually">Follow <span class="username u-dir u-textTruncate" dir="ltr">@<b>tweetgenonline</b></span></span>
                </button>
                <button type="button" class="
                  EdgeButton
                  EdgeButton--primary
                  EdgeButton--medium 
                  button-text
                  following-text" id="followingOutput" style="display: block;">
                <span aria-hidden="true">Following</span>
                <span class="u-hiddenVisually">Following <span class="username u-dir u-textTruncate" dir="ltr">@<b>tweetgenonline</b></span></span>
                </button>
                <button type="button" class="
                  EdgeButton
                  EdgeButton--danger
                  EdgeButton--medium 
                  button-text
                  unfollow-text">
                <span aria-hidden="true">Unfollow</span>
                <span class="u-hiddenVisually">Unfollow <span class="username u-dir u-textTruncate" dir="ltr">@<b>tweetgenonline</b></span></span>
                </button>
                </span>
              </div>
            </div>
            <div class="ProfileTweet-action ProfileTweet-action--more js-more-ProfileTweet-actions">
              <div class="dropdown">
                <button class="ProfileTweet-actionButton u-textUserColorHover tw-dropdown-toggle js-dropdown-toggle" type="button">
                  <div class="IconContainer js-tooltip" title="More">
                    <span class="Icon Icon--small"></span>
                    <span class="u-hiddenVisually">More</span>
                  </div>
                </button>
                <div class="dropdown-menu is-autoCentered">
                  <div class="dropdown-caret">
                    <div class="caret-inner"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="js-tweet-text-container">
          <p class="TweetTextSize TweetTextSize--jumbo js-tweet-text tweet-text" lang="en" id="tweetOutput">{{content}}</p>
        </div>
  
      
        <div class="js-tweet-details-fixer tweet-details-fixer">
          <div class="client-and-actions">
            <span class="metadata">
              <span id="timeOutput">01/01/2023</span> - <span id="yearOutput">01/01/2023</span>
            </span>
          </div>
          <div class="js-tweet-stats-container tweet-stats-container" id="statContainer" style="display: block;">
            <ul class="stats" aria-label="Retweeted and favorited by">
              <li class="js-stat-count js-stat-retweets stat-count" aria-hidden="true">
                <a tabindex="0" role="button" class="request-retweeted-popup" id="retweetStat" style="display: inline-block;">                  
                <strong id="retweetDetailed" style="display: inline-block;">100</strong> Retweets
                </a>
              </li>
              <li class="js-stat-count js-stat-favorites stat-count" aria-hidden="true">
                <a tabindex="0" role="button" class="request-favorited-popup" id="likeStat" style="display: inline-block;"> 
                <strong id="likeDetailed" style="display: inline-block;">10000</strong> Likes
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="stream-item-footer">
          <div class="ProfileTweet-actionList js-actions" role="group" aria-label="Tweet actions">
            <div class="ProfileTweet-action ProfileTweet-action--reply">
              <button class="ProfileTweet-actionButton js-actionButton js-actionReply" data-modal="ProfileTweet-reply" type="button">
                <div class="IconContainer js-tooltip" title="Reply">
                  <span class="Icon Icon--medium"></span>
                  <span class="u-hiddenVisually">Reply</span>
                </div>
                <span class="ProfileTweet-actionCount ">
                <span class="ProfileTweet-actionCountForPresentation" aria-hidden="true" id="replyNumber" style="display: block;">1000000</span>
                </span>
              </button>
            </div>
            <div class="ProfileTweet-action ProfileTweet-action--retweet js-toggleState js-toggleRt">
              <button class="ProfileTweet-actionButton  js-actionButton js-actionRetweet" data-modal="ProfileTweet-retweet" type="button">
                <div class="IconContainer js-tooltip" title="Retweet">
                  <span class="Icon Icon--medium"></span>
                  <span class="u-hiddenVisually">Retweet</span>
                </div>
                <span class="ProfileTweet-actionCount">
                <span class="ProfileTweet-actionCountForPresentation" aria-hidden="true" id="retweetNumber" style="display: block;">10000</span>
                </span>
              </button>
              <button class="ProfileTweet-actionButtonUndo js-actionButton js-actionRetweet" data-modal="ProfileTweet-retweet" type="button">
                <div class="IconContainer js-tooltip" title="Undo retweet">
                  <span class="Icon Icon--medium"></span>
                  <span class="u-hiddenVisually">Retweeted</span>
                </div>
                <span class="ProfileTweet-actionCount">
                  <span class="ProfileTweet-actionCountForPresentation" aria-hidden="true" id="retweetNumber">
                    <!-- retweet number -->
                  </span>
                </span>
              </button>
            </div>
            <div class="ProfileTweet-action ProfileTweet-action--favorite js-toggleState">
              <button class="ProfileTweet-actionButton js-actionButton js-actionFavorite" type="button">
                <div class="IconContainer js-tooltip" data-original-title="Like">
                  <span class="Icon Icon--medium"></span>
                  <span class="u-hiddenVisually">Like</span>
                </div>
                <span class="ProfileTweet-actionCount">
                <span class="ProfileTweet-actionCountForPresentation" aria-hidden="true" id="likeNumber" style="display: block;">10000    </span>
                </span>
              </button>
              <button class="ProfileTweet-actionButtonUndo ProfileTweet-action--unfavorite u-linkClean js-actionButton js-actionFavorite" type="button">
                <div class="IconContainer js-tooltip" title="Undo like">
                  <span class="Icon Icon--medium"></span>
                  <span class="u-hiddenVisually">Liked</span>
                </div>
                <span class="ProfileTweet-actionCount">
                  <span class="ProfileTweet-actionCountForPresentation" aria-hidden="true" id="likeNumber">
                    <!-- like number -->
                  </span>
                </span>
              </button>
            </div>
            <div class="ProfileTweet-action ProfileTweet-action--dm">
              <button class="ProfileTweet-actionButton u-textUserColorHover js-actionButton js-actionShareViaDM" type="button" data-nav="share_tweet_dm">
                <div class="IconContainer js-tooltip" title="Direct message">
                  <span class="Icon Icon--medium"></span>
                  <span class="u-hiddenVisually">Direct message</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>`,
    content: [{ name: name, content: content, output: 'memes/tweet/tweet.png' }]
  })
}
async function get_aukaat_meme(msg){

    //create a TextOnGif object
    var gif = new TextOnGif({
      file_path: "aukaat-aukaat-dikha-di.gif",
      alignment_y:"top",
      font_color:"orange",
      font_size:"25px"
      //path to local file, url or Buffer
    });

    //write as file
    return gif.textOnGif({
        text: msg,
        get_as_buffer: false, //set to false to save time
        write_path: "aukaat_meme.gif"
    });
    
}

module.exports = {get_aukaat_meme,generate_tweet}