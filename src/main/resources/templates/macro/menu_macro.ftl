<#macro navbar>
		<nav class="navbar navbar-inverse">
			<a class="navbar-brand" href="<@spring.url '/index' />">Mon application</a>
			<ul class="nav navbar-nav">
				<li><a href="<@spring.url '/index' />">Accueil</a></li>
				<li><a href="<@spring.url '/add' />">Add</a></li>
				<li><a href="<@spring.url '/list' />">List</a></li>
				<li><a class="forceQuit" href="<@spring.url '#component1?age=21&name=Tony' />">Aurelia component 1</a></li>
				<li><a class="forceQuit" href="<@spring.url '#component2?age=21&name=Tony' />">Aurelia component 2</a></li>
				
			</ul>
			<ul class="nav navbar-nav navbar-right">
				<li>
					<a class="forceQuit" href="<@spring.url '/index' />">Logout</a>
				</li>
			</ul>
		</nav>
		
</#macro>