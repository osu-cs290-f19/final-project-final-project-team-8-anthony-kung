# Summer Camp Management System (SCMS)
Powered by Anthony Kung <hello@anthonykung.com> ([anthonykung.com](https://anthonykung.com))

## Content
1. [Intro](https://github.com/osu-cs290-f19/final-project-final-project-team-8-anthony-kung#intro)
2. [Docs](https://github.com/osu-cs290-f19/final-project-final-project-team-8-anthony-kung#docs)
3. [Install](https://github.com/osu-cs290-f19/final-project-final-project-team-8-anthony-kung#install)
4. [Usage](https://github.com/osu-cs290-f19/final-project-final-project-team-8-anthony-kung#usage)
5. [Contributing](https://github.com/osu-cs290-f19/final-project-final-project-team-8-anthony-kung#contributing)
6. [Security](https://github.com/osu-cs290-f19/final-project-final-project-team-8-anthony-kung#security)
7. [License](https://github.com/osu-cs290-f19/final-project-final-project-team-8-anthony-kung#license)

## Intro
SCMS is designed to help KidSpirit OSU in the digital management of their campers. It provides them a tool to quickly identify a camper, get immediate help, locate a nearby responder, process payment and more.

The Summer Camp Management System uses PWA Technology to serve on mobile devices. PWA technology ensures that most features of the system are available offline through service workers. PWA allows the user to use SCMS similar to a native mobile app.

SCMS adapts NFC (Google Chrome Beta required) and Face Recognition to quickly identify the camper and their emergency information should there be an emergency. There is also a geolocation system to function as an emergency beacon for quick navigation to emergency responders and supervisors. It also constantly displays a map with beacons of registered emergency responders.

The SCMS also incorporated a mobile payment system (mPOS) powered by Stripe API. This allows the camp staff to process payment anytime anywhere. The SCMS is encrypted with TLS 1.2 protocol and complies with PCI DSS v3.2 to provide maximum security.

To facilitate communication, the SCMS also includes a built-in push-to-talk voice communication system. This allows camp staff to use it as a walkie talkie with no range limit (via the internet).

## Docs

## Install

## Usage

## Contributing
Thank you for your interest in contributing SCMS ☺

You can contribute by using either the pull request or creating issues. More information on [Contributing Guideline](./DOCS/CONTRIBUTING.md)

## Security
We take any security risks seriously, if you have found or suspected a vulnerability or anything that might compromise our security, we would very much appreciate it if you can report it to us.

More information on [SECURITY.md](./SECURITY.md)

## License
[GNU AGPLv3](./DOCS/LICENSE.md)

Summer Camp Management System - Making sure the kids' welfare.

Copyright (C) 2019  Anthony Kung <hello@anthonykung.com> by [Oregon State University Copyright Principles](https://advantage.oregonstate.edu/sites/advantage.oregonstate.edu/files/osu_copyright_principles_0.pdf).

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

You can contact Anthony Kung at hello@anthonykung.com or proceed to [anthonykung.com](https://anthonykung.com).

If your software can interact with users remotely through a computer
network, you should also make sure that it provides a way for users to
get its source.  For example, if your program is a web application, its
interface could display a "Source" link that leads users to an archive
of the code.  There are many ways you could offer source, and different
solutions will be better for different programs; see section 13 for the
specific requirements.

You should also get your employer (if you work as a programmer) or school,
if any, to sign a "copyright disclaimer" for the program, if necessary.
For more information on this, and how to apply and follow the GNU AGPL, see
<https://www.gnu.org/licenses/>.
