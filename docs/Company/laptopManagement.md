---
sidebar_position: 2
---

# OET Laptop Management

## Purpose

This document provides an overview of the policies and practices related to the procurement and management of laptops at OET.

## Scope

OET implements centralized management for all company-issued laptops.

## New Hire Laptop Ordering Process

At OET, as a startup, we operate with a lean administrative team. To accommodate our new team members, we provide the following laptop models which are dispatched to the candidate's location:

- [XPS 13 Plus](https://www.dell.com/en-us/shop/dell-laptops/xps-13-plus-laptop/spd/xps-13-9320-laptop/usexchbts9320ghhw?ref=variantstack)
- [XPS 15](https://www.dell.com/en-us/shop/dell-laptops/xps-15-laptop/spd/xps-15-9530-laptop/usexchbts9530gdbp?ref=variantstack)

As we foster a global team, there may be instances where OET is unable to directly order the laptop on your behalf. In such cases, OET will assist you in the procurement process of laptops.

For more details, please refer to the procurement guidelines in the [Candidate Laptop Procurement Section](section-on-page).

## Important Considerations

- Laptops purchased or reimbursed by OET are company property and must be reported with serial numbers, make, model, screen size, and processor details. Use the OET Laptop Information Form for proper asset tracking.
- Loss or damage must be reported immediately and Refer to the **[Laptop Repair](#laptop-repair)** section for more details.

## Configuring New Laptops

Our IT Self Service Guides are designed to assist team members with the installation, configuration, and troubleshooting of laptops and our technology stack applications.

### Overview

DriveStrike is a critical security application for devices running on Linux, providing capabilities for remote lock or wipe in case of an emergency. It's a mandatory security measure for all Linux-operated devices at OET and is utilized for wiping MacOS systems when Jamf is not an option.

When installed on OET devices, DriveStrike can:

- Remotely lock or wipe the hardware.
- Collect essential data such as:
  - Usernames & Accounts on the device.
  - Machine Name, Make, Model, MAC, and Serial Number.
  - Hardware Specifications (CPU, RAM, HDD usage).
  - Firewall and OS Version & Update status.
  - Disk encryption and Battery Health status.
  - GPS location for devices with GPS capabilities.
  - Nearby WiFi networks for triangulation (SSID, signal strength, channel, MAC address).
  - IP Address of the device.

### Installation Process

For team members utilizing Linux for work, the IT team may provide an installation link for DriveStrike via email. Should you require the installer, please request one in the `#it_help` channel on our communication platform.

You'll receive an email titled "Invitation to DriveStrike" from `support@drivestrike.com` with installation instructions:

1. Open the email on the Linux device you wish to secure.
2. Follow the provided [link](https://app.drivestrike.com/instructions/linux) to begin the installation process.
3. When prompted, use your `@oet.com` email address for registration with DriveStrike.

Encounter any issues during installation or if your email address isn't recognized, please contact support channel for further assistance.

## Regular Refresh Cycle

Team members at OET are eligible to refresh their laptops after 3 years of usage. This period is based on the duration of laptop use, not the length of employment. This policy applies even if a used laptop was provided at the time of onboarding. However, if your current laptop meets your needs, you are encouraged to continue using it.

Upon receiving a replacement laptop, you must wipe or return the old one within 2 weeks. Ensure that you transfer all necessary information to the new laptop within this timeframe.

To request a laptop as part of the refresh program, please follow the instructions outlined in the provided template.

Refer to our **[Laptop Buy Back Policy](#laptop-buy-back-policy)** if you're undergoing a laptop refresh.

## Laptops Out of Specification

For laptops that fall outside our standard specifications, approval from a senior is required before we can proceed with the purchase.

## Laptop Replacement Program

Accidents happen, and we understand that. If your laptop is broken or insufficient for your role and you haven't reached the 3-year refresh milestone, you may request a replacement.

## Laptop Repair

If your laptop needs repair:

1. Backup your data.
2. Ensure your laptop is not your sole device for two-factor authentication.
3. If the repair costs are below $1000 USD, proceed and expense the repair.
4. Open an issue in the End User Services Issue Tracker to document the repair and get your manager's approval.
5. Do not provide credentials to the repair center. They are authorized to factory reset if necessary.
6. After repair, follow these steps ([instructions here](#configuring-new-laptops)) and restore from a backup.

For extensive and costly repairs, where you have no backup laptop, replacing the laptop may be the best option. In such cases, open an issue to replace the laptop following the provided guidelines.

When you receive your new laptop, we will arrange for the old one to be sent to our reseller.

## Laptop Buy Back Policy

Team members who haven't completed 1 year at OET or who have received a laptop refresh within the last year can purchase their laptops at current market value. For those who have used their laptop for over a year, the option to keep the laptop at no charge is available.

All retained laptops must be wiped clean of data.
