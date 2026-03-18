import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function FooterBlock() {
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <nav className="footer__wrapper">
        <div className="footer__logo">
          <img src="/images/footer_logo.svg" alt="logo" />
        </div>

        <div className="footer__links">
          <h4>{t('components.FooterBlock.foundations.title')}</h4>
          <ul className="footer__links-block">
            <li className="footer__links-link">
              <Link to="#">{t('components.FooterBlock.foundations.links.AboutTMDB')}</Link>
            </li>
            <li className="footer__links-link">
              <Link to="#">{t('components.FooterBlock.foundations.links.ContactUs')}</Link>
            </li>
            <li className="footer__links-link">
              <Link to="#">{t('components.FooterBlock.foundations.links.SupportForums')}</Link>
            </li>
            <li className="footer__links-link">
              <Link to="#">{t('components.FooterBlock.foundations.links.API')}</Link>
            </li>
            <li className="footer__links-link">
              <Link to="#">{t('components.FooterBlock.foundations.links.SystemStatus')}</Link>
            </li>
          </ul>
        </div>

        <div className="footer__links">
          <h4>{t('components.FooterBlock.participate.title')}</h4>
          <ul className="footer__links-block">
            <li className="footer__links-link">
              <Link to="#">{t('components.FooterBlock.participate.links.BibleWithSupport')}</Link>
            </li>
            <li className="footer__links-link">
              <Link to="#">{t('components.FooterBlock.participate.links.AddNewMovie')}</Link>
            </li>
            <li className="footer__links-link">
              <Link to="#">{t('components.FooterBlock.participate.links.AddNewTVShow')}</Link>
            </li>
          </ul>
        </div>

        <div className="footer__links">
          <h4>{t('components.FooterBlock.community.title')}</h4>
          <ul className="footer__links-block">
            <li className="footer__links-link">
              <Link to="#">{t('components.FooterBlock.community.links.Advice')}</Link>
            </li>
            <li className="footer__links-link">
              <Link to="#">{t('components.FooterBlock.community.links.Discussions')}</Link>
            </li>
            <li className="footer__links-link">
              <Link to="#">{t('components.FooterBlock.community.links.Leaderboard')}</Link>
            </li>
            <li className="footer__links-link">
              <Link to="#">{t('components.FooterBlock.community.links.Twitter')}</Link>
            </li>
          </ul>
        </div>

        <div className="footer__links">
          <h4>{t('components.FooterBlock.terms.title')}</h4>
          <ul className="footer__links-block">
            <li className="footer__links-link">
              <Link to="#">{t('components.FooterBlock.terms.links.TermsOfUse')}</Link>
            </li>
            <li className="footer__links-link">
              <Link to="#">{t('components.FooterBlock.terms.links.APIUsageRules')}</Link>
            </li>
            <li className="footer__links-link">
              <Link to="#">{t('components.FooterBlock.terms.links.PrivacyPolicy')}</Link>
            </li>
            <li className="footer__links-link">
              <Link to="#">{t('components.FooterBlock.terms.links.DMCARequest')}</Link>
            </li>
          </ul>
        </div>
      </nav>
    </footer>
  )
}

