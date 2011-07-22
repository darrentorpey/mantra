get '/': '<h1>Hi</h1><p>Hello!</p>'

get '/javascripty': -> render 'javascripty'

client javascriptsrus: ->
  console.log ':: javascriptsrus loaded ::'

view javascripty: ->
  h1 'Client embedding example (javascripty)'

view index: ->
  h1 "Hey there, #{@user.plan} dude", class: @user.plan
  p @foo
  section 'Admin', class: 'admin'

get '/postrender': ->
  @user = plan: 'not_staff'
  render 'index', apply: 'plans'

postrender plans: ->
  $('section.admin').remove() if @user.plan isnt 'staff'
  $('div.' + @user.plan).addClass 'highlighted'

layout ->
  html ->
    head ->
      title 'Messing with Zappa'
      script src: '/javascriptsrus.js'
    body -> """
      <div id="container" class="#{@user.plan}">
        #{@content}
      </div>
    """

get '/:name': ->
  "Hi, #{@name}"
