$(function() {

  var $navDropdown = $(".dropdown-button");
  var $sources = $('.news-source')
  var $storyTemplate = $('#story-template');
  var $stories = $('#stories');
  var $spinner = $('#spinner');

  var Config = {
    reddit: {
      'javascript': 'http://localhost:3000/mocks/reddit-javascript.json',//'https://www.reddit.com/r/javascript.json'
      'earthporn': 'http://localhost:3000/mocks/reddit-earthporn.json',//'https://www.reddit.com/r/earthporn.json'
      'funny': 'http://localhost:3000/mocks/reddit-funny.json',//'https://www.reddit.com/r/funny.json'
      'diy': 'http://localhost:3000/mocks/reddit-diy.json',//'https://www.reddit.com/r/diy.json'
    }
  };

  $navDropdown.dropdown();

  $.get(Config.reddit.diy, function(data) {
    $spinner.hide();
    data.data.children.forEach(function(json) {
      var story = json.data;

      console.log(story);

      var context = {
        title: story.title,
        description: story.selftext,
        author: story.author,
        href: story.url,
        commentsLink: 'https://www.reddit.com' + story.permalink,
      };

      if(story.thumbnail.indexOf('http') > -1) {
        context.thumbnail = story.thumbnail;
      }

      if(story.media && story.media.oembed && story.media.oembed.thumbnail_url) {
        context.image_url = story.media.oembed.thumbnail_url
      }

      var html = Handlebars.compile($storyTemplate.html())(context)
      $stories.append(html);
    });
  })
});
