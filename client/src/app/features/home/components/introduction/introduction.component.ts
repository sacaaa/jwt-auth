import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';

@Component({
    selector: 'app-introduction',
    imports: [CommonModule],
    templateUrl: './introduction.component.html',
    styleUrls: ['./introduction.component.css'],
})
export class IntroductionComponent {
    faqList = [
        {
            question: 'What is JSON Web Token?',
            list: [
                'JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.',
                'Although JWTs can be encrypted to also provide secrecy between parties, we will focus on signed tokens. Signed tokens can verify the integrity of the claims contained within it, while encrypted tokens hide those claims from other parties. When tokens are signed using public/private key pairs, the signature also certifies that only the party holding the private key is the one that signed it.',
            ],
        },
        {
            question: 'When should you use JSON Web Tokens?',
            answer: 'Here are some scenarios where JSON Web Tokens are useful:',
            list: [
                'Authorization: This is the most common scenario for using JWT. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token. Single Sign-On (SSO) is a feature that widely uses JWT nowadays, because of its small overhead and its ability to be easily used across different domains.',
                "Information Exchange: JSON Web Tokens are a good way of securely transmitting information between parties. Because JWTs can be signed—for example, using public/private key pairs—you can be sure the senders are who they say they are. Additionally, as the signature is calculated using the header and the payload, you can also verify that the content hasn't been tampered with.",
            ],
        },
        {
            question: 'What is the JSON Web Token structure?',
            answer: 'In its compact form, JSON Web Tokens consist of three parts separated by dots (.), which are:',
            list: ['Header', 'Payload', 'Signature'],
        },
        {
            question: 'Header',
            answer: 'The header typically consists of two parts: the type of the token, which is JWT, and the signing algorithm being used, such as HMAC SHA256 or RSA.',
            list: ['{ "alg": "HS256", "typ": "JWT" }'],
        },
        {
            question: 'Payload',
            answer: 'The second part of the token is the payload, which contains the claims. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims: registered, public, and private claims.',
            list: [
                'Registered claims: These are a set of predefined claims which are not mandatory but recommended, to provide a set of useful, interoperable claims. Some of them are: iss (issuer), exp (expiration time), sub (subject), aud (audience), and others.',
                'Public claims: These can be defined at will by those using JWTs. But to avoid collisions they should be defined in the IANA JSON Web Token Registry or be defined as a URI that contains a collision resistant namespace.',
                'Private claims: These are the custom claims created to share information between parties that agree on using them and are neither registered or public claims.',
            ],
        },
        {
            question: 'Signature',
            answer: 'To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.',
        },
        {
            question: 'Putting all together',
            answer: 'The output is three Base64-URL strings separated by dots that can be easily passed in HTML and HTTP environments, while being more compact when compared to XML-based standards such as SAML.',
        },
    ];

    activeIndex: number | null = null;

    constructor(private el: ElementRef) {}

    toggleAccordion(index: number) {
        this.activeIndex = this.activeIndex === index ? null : index;
    }
}
