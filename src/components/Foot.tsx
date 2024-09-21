//!============================================================
//!                     Foooter Component
//!============================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This is the default Footer (Foooter) component.
//!============================================================

// ===================
//       Imports
// ===================

// ------- Components ---------
import {
    Footer,
    FooterCopyright,
    FooterLink,
    FooterLinkGroup,
} from "flowbite-react";

// ============================================
//       Exports default Foooter component
// ============================================
export default function Foooter() {
    return (
        <Footer container className="rounded-none">
            <FooterCopyright href="/" by="Rohan Vashisht" year={2024} />
            <FooterLinkGroup>
                <FooterLink href="/about">About</FooterLink>
                <FooterLink href="/help">Help</FooterLink>
                <FooterLink href="https://github.com/zigistry/zigistry">
                    GitHub
                </FooterLink>
            </FooterLinkGroup>
        </Footer>
    );
}
