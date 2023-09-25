<script setup>

const footerlinks = [
	{
		category: 'ОСНОВИ',
		items: ['Про TMDB', 'Зв’язок із нами', 'Форуми підтримки', 'API', 'Стан системи'],
	},
	{
		category: 'УЗЯТИ УЧАСТЬ',
		items: ['Біблія зі сприяння', 'Додати новий фільм', 'Додати новий серіал'],
	},
	{
		category: 'СПІЛЬНОТА',
		items: ['Поради', 'Обговорення', 'Таблиця лідерів', 'Twitter'],
	},
	{
		category: 'УГОДИ',
		items: ['Умови користування', 'Правила використання API', 'Політика конфіденційності', 'Запит DMCA'],
	},
]
</script>

<template>
  <footer class="footer">
		<nav>
			<div class="links">
				<img
					src="/public/images/footer_logo.svg"
					alt="logo"
				/>
			</div>
			<div
				v-for="category in footerlinks"
				:key="category.category"
				class="links"
			>
				<h4>{{ category.category }}</h4>
				<ul>
					<li
						v-for="item in category.items"
						:key="item"
					>
          <RouterLink to="#">{{ item }}</RouterLink>
					</li>
				</ul>
			</div>
		</nav>
	</footer>
</template>
