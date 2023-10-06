<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
	<footer class="footer">
		<nav class="footer__wrapper">
			<div class="footer__logo">
				<img
					src="/public/images/footer_logo.svg"
					alt="logo"
				/>
			</div>
			<!-- Foundations -->
			<div class="footer__links">
				<h4>
					{{ t('components.FooterBlock.foundations.title') }}
				</h4>
				<ul class="footer__links-block">
					<li class="footer__links-link">
						<RouterLink to="#">
							{{ t('components.FooterBlock.foundations.links.AboutTMDB') }}
						</RouterLink>
					</li>
					<li class="footer__links-link">
						<RouterLink to="#">
							{{ t('components.FooterBlock.foundations.links.ContactUs') }}
						</RouterLink>
					</li>
					<li class="footer__links-link">
						<RouterLink to="#">
							{{ t('components.FooterBlock.foundations.links.SupportForums') }}
						</RouterLink>
					</li>
					<li class="footer__links-link">
						<RouterLink to="#">
							{{ t('components.FooterBlock.foundations.links.API') }}
						</RouterLink>
					</li>
					<li class="footer__links-link">
						<RouterLink to="#">
							{{ t('components.FooterBlock.foundations.links.SystemStatus') }}
						</RouterLink>
					</li>
				</ul>
			</div>
			<!-- Participate -->
			<div class="footer__links">
				<h4>
					{{ t('components.FooterBlock.participate.title') }}
				</h4>
				<ul class="footer__links-block">
					<li class="footer__links-link">
						<RouterLink to="#">
							{{ t('components.FooterBlock.participate.links.BibleWithSupport') }}
						</RouterLink>
					</li>
					<li class="footer__links-link">
						<RouterLink to="#">
							{{ t('components.FooterBlock.participate.links.AddNewMovie') }}
						</RouterLink>
					</li>
					<li class="footer__links-link">
						<RouterLink to="#">
							{{ t('components.FooterBlock.participate.links.AddNewTVShow') }}
						</RouterLink>
					</li>
				</ul>
			</div>
			<!-- Community -->
			<div class="footer__links">
				<h4>
					{{ t('components.FooterBlock.community.title') }}
				</h4>
				<ul class="footer__links-block">
					<li class="footer__links-link">
						<RouterLink to="#">
							{{ t('components.FooterBlock.community.links.Advice') }}
						</RouterLink>
					</li>
					<li class="footer__links-link">
						<RouterLink to="#">
							{{ t('components.FooterBlock.community.links.Discussions') }}
						</RouterLink>
					</li>
					<li class="footer__links-link">
						<RouterLink to="#">
							{{ t('components.FooterBlock.community.links.Leaderboard') }}
						</RouterLink>
					</li>
					<li class="footer__links-link">
						<RouterLink to="#">
							{{ t('components.FooterBlock.community.links.Twitter') }}
						</RouterLink>
					</li>
				</ul>
			</div>
			<!-- Terms -->
			<div class="footer__links">
				<h4>
					{{ t('components.FooterBlock.terms.title') }}
				</h4>
				<ul class="footer__links-block">
					<li class="footer__links-link">
						<RouterLink to="#">
							{{ t('components.FooterBlock.terms.links.TermsOfUse') }}
						</RouterLink>
					</li>
					<li class="footer__links-link">
						<RouterLink to="#">
							{{ t('components.FooterBlock.terms.links.APIUsageRules') }}
						</RouterLink>
					</li>
					<li class="footer__links-link">
						<RouterLink to="#">
							{{ t('components.FooterBlock.terms.links.PrivacyPolicy') }}
						</RouterLink>
					</li>
					<li class="footer__links-link">
						<RouterLink to="#">
							{{ t('components.FooterBlock.terms.links.DMCARequest') }}
						</RouterLink>
					</li>
				</ul>
			</div>
		</nav>
	</footer>
</template>
