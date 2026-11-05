import type { Lang } from './types';

/**
 * EDITABLE TEMPLATES for the legal / policy pages.
 *
 * !!! These are NOT finished legal documents and do NOT by themselves make the shop
 * compliant with Greek or EU law.
 * Have the final texts checked against the current Greek and EU consumer
 * protection, distance-selling, privacy (GDPR) and e-commerce requirements
 * (ideally by a lawyer or accountant) before launch. !!!
 */

export type LegalKey = 'shipping' | 'returns' | 'privacy' | 'terms';

export interface LegalSection {
  h: string;
  p: string[];
}
export interface LegalDoc {
  title: string;
  intro: string;
  sections: LegalSection[];
}


export const legal: Record<Lang, Record<LegalKey, LegalDoc>> = {
  el: {
    shipping: {
      title: 'Αποστολή και παράδοση',
      intro: '',
      sections: [
        {
          h: 'Μεταφορικά',
          p: [
            'Τα μεταφορικά είναι €5 ανά παραγγελία, ανεξάρτητα από τον αριθμό των προϊόντων, και εμφανίζονται στη σύνοψη της παραγγελίας.',
            'Αν παραλάβετε την παραγγελία από το κατάστημα, δεν χρεώνεστε μεταφορικά.',
          ],
        },
        {
          h: 'Πληρωμή',
          p: ['Η πληρωμή γίνεται με τραπεζική κατάθεση (IBAN) ή IRIS, μετά την επιβεβαίωση της παραγγελίας από το κατάστημα. Δεν προσφέρεται αντικαταβολή και δεν γίνονται online πληρωμές με κάρτα. Η παραγγελία θεωρείται ότι ολοκληρώνεται μετά την επιβεβαίωση και την εξόφληση, όπως θα σας ενημερώσουμε. Η εξόφληση πρέπει να πραγματοποιείται εντός 2 εργάσιμων ημερών από την επιβεβαίωση, διαφορετικά η παραγγελία ακυρώνεται αυτόματα.'],
        },
        {
          h: 'Επιβεβαίωση παραγγελίας',
          p: [
            'Η υποβολή της φόρμας παραγγελίας αποτελεί αίτημα αγοράς. Το κατάστημα ελέγχει τη διαθεσιμότητα, την τιμή και τα μεταφορικά και επικοινωνεί μαζί σας για την επιβεβαίωση. Ο χρόνος και ο τρόπος παράδοσης συμφωνούνται κατά την επιβεβαίωση. Οι αποστολές καλύπτουν όλη την Ελλάδα και πραγματοποιούνται μέσω συνεργαζόμενων εταιρειών courier, θυρίδων BOX NOW, ή με παραλαβή από το φυσικό μας κατάστημα.',
          ],
        },
      ],
    },
    returns: {
      title: 'Επιστροφές, υπαναχώρηση και ακυρώσεις',
      intro: '',
      sections: [
        {
          h: 'Δικαίωμα υπαναχώρησης',
          p: [
            'Ως καταναλωτής έχετε, κατά κανόνα, δικαίωμα υπαναχώρησης από σύμβαση εξ αποστάσεως εντός 14 ημερών από την παραλαβή των προϊόντων, χωρίς αιτιολογία, σύμφωνα με την ισχύουσα νομοθεσία.',
            'Για την άσκηση του δικαιώματος υπαναχώρησης, τα προϊόντα πρέπει να επιστρέφονται στην αρχική τους άριστη κατάσταση, αφόρετα, με τις ετικέτες τους και την αρχική τους συσκευασία. Τα άμεσα έξοδα επιστροφής των προϊόντων επιβαρύνουν τον αγοραστή. Το δικαίωμα υπαναχώρησης δεν ισχύει για προϊόντα που κατασκευάζονται ή μεταποιούνται κατόπιν ειδικής παραγγελίας/προδιαγραφών του καταναλωτή, καθώς και για προϊόντα τα οποία δεν είναι κατάλληλα προς επιστροφή για λόγους προστασίας της υγείας ή υγιεινής εφόσον έχουν αποσφραγιστεί μετά την παράδοση.',
          ],
        },
        {
          h: 'Πώς ασκείται η υπαναχώρηση',
          p: [
            'Επικοινωνήστε μαζί μας με σαφή δήλωση ότι επιθυμείτε να υπαναχωρήσετε, μέσω email στο taniskidis.g@gmail.com ή τηλεφωνικά στο 2310328128. Η επιστροφή των προϊόντων γίνεται στη διεύθυνση Μαρασλή 75, Τ.Κ. 54249, Θεσσαλονίκη, είτε με ταχυμεταφορική (courier) της επιλογής σας είτε εύκολα μέσω BOX NOW.',
            'Τα προϊόντα πρέπει να επιστρέφονται σε κατάσταση που επιτρέπει την επαναπώληση, όπως ορίζει η νομοθεσία (αφόρετα, με τις ετικέτες και την αρχική συσκευασία τους). Το κόστος της μεταφορικής για την επιστροφή επιβαρύνει τον πελάτη.',
          ],
        },
        {
          h: 'Επιστροφή χρημάτων',
          p: [
            'Σε περίπτωση άσκησης του δικαιώματος υπαναχώρησης, η επιστροφή των χρημάτων σας θα ολοκληρωθεί εντός 14 ημερολογιακών ημερών από την ημερομηνία που θα παραλάβουμε τα επιστρεφόμενα προϊόντα και θα επιβεβαιώσουμε ότι βρίσκονται στην αρχική τους άριστη κατάσταση.',
            'Η επιστροφή εκτελείται με το ίδιο μέσο πληρωμής που χρησιμοποιήσατε για την αρχική σας αγορά, δηλαδή με κατάθεση στον τραπεζικό λογαριασμό (IBAN) ή μέσω IRIS που θα μας υποδείξετε.',
          ],
        },
      ],
    },
    privacy: {
      title: 'Πολιτική απορρήτου',
      intro: '',
      sections: [
        {
          h: 'Υπεύθυνος επεξεργασίας',
          p: ['Υπεύθυνος επεξεργασίας των δεδομένων σας είναι η LANGZI, ΑΦΜ 016472415, ΔΟΥ Αμπελοκήπων, ΓΕΜΗ 168002104000, Μαρασλή 75, Τ.Κ. 54249, Θεσσαλονίκη, email: taniskidis.g@gmail.com, τηλ.: 2310328128.'],
        },
        {
          h: 'Ποια δεδομένα συλλέγουμε',
          p: [
            'Μέσω της φόρμας παραγγελίας: ονοματεπώνυμο, τηλέφωνο, διεύθυνση παράδοσης, προαιρετικά email και οδηγίες παράδοσης, καθώς και τα προϊόντα που παραγγέλνετε.',
            'Δεν ζητούμε στοιχεία πληρωμής με κάρτα.',
          ],
        },
        {
          h: 'Σκοπός και νομική βάση',
          p: ['Τα στοιχεία χρησιμοποιούνται για την εκτέλεση και παράδοση της παραγγελίας σας και για την επικοινωνία σχετικά με αυτήν. Η επεξεργασία των δεδομένων σας είναι απαραίτητη για την εκτέλεση της μεταξύ μας σύμβασης (άρθρο 6 παρ. 1β του ΓΚΠΔ/GDPR), καθώς και για τη συμμόρφωσή μας με τις νόμιμες και φορολογικές μας υποχρεώσεις (άρθρο 6 παρ. 1γ του ΓΚΠΔ/GDPR), όπως η έκδοση παραστατικών και η διατήρηση φορολογικών αρχείων σύμφωνα με την ισχύουσα νομοθεσία.'],
        },
        {
          h: 'Αποθήκευση στη συσκευή σας',
          p: ['Το καλάθι και η γλώσσα αποθηκεύονται τοπικά στον browser σας (LocalStorage). Δεν αποθηκεύονται εκεί προσωπικά στοιχεία παράδοσης.'],
        },
        {
          h: 'Φιλοξενία και εξυπηρετητές',
          p: ['Η ιστοσελίδα φιλοξενείται από τη Netlify και οι παραγγελίες συλλέγονται μέσω Netlify Forms.'],
        },
        {
          h: 'Cookies και αναλυτικά στοιχεία',
          p: ['Cookies αναλυτικών στοιχείων ή διαφήμισης φορτώνονται μόνο αν έχουν ρυθμιστεί και αφού δώσετε τη συγκατάθεσή σας.'],
        },
        {
          h: 'Δικαιώματά σας',
          p: ['Για την άσκηση των δικαιωμάτων σας, μπορείτε να επικοινωνήσετε μαζί μας στο taniskidis.g@gmail.com. Τα προσωπικά σας δεδομένα διατηρούνται για το χρονικό διάστημα που απαιτείται για την εκτέλεση της παραγγελίας και στη συνέχεια για όσο διάστημα επιβάλλεται από τη φορολογική νομοθεσία ή για την προάσπιση των νομίμων δικαιωμάτων μας.'],
        },
      ],
    },
    terms: {
      title: 'Όροι και προϋποθέσεις',
      intro: '',
      sections: [
        {
          h: 'Παραγγελίες',
          p: [
            'Η υποβολή παραγγελίας αποτελεί πρόταση αγοράς. Η σύμβαση ολοκληρώνεται όταν το κατάστημα επιβεβαιώσει την παραγγελία σας.',
            'Το κατάστημα διατηρεί το δικαίωμα να μην επιβεβαιώσει παραγγελία σε περίπτωση μη διαθεσιμότητας ή σφάλματος τιμής, ενημερώνοντάς σας.',
          ],
        },
        {
          h: 'Τιμές',
          p: [
            'Οι τιμές αναγράφονται σε ευρώ. Ισχύουν οι εξής τιμές πακέτων: 1 πουκάμισο €25, 2 πουκάμισα €40, 3 πουκάμισα €50. Ο ΦΠΑ περιλαμβάνεται σε όλες τις τιμές.',
            'Τα μεταφορικά είναι €5 ανά παραγγελία και είναι δωρεάν για παραλαβή από το κατάστημα.',
          ],
        },
        {
          h: 'Πληρωμή',
          p: ['Τραπεζική κατάθεση (IBAN) ή IRIS, μετά την επιβεβαίωση της παραγγελίας.'],
        },
        {
          h: 'Διαθεσιμότητα',
          p: ['Η διαθεσιμότητα των προϊόντων επιβεβαιώνεται από το κατάστημα. Οι ενδείξεις στον ιστότοπο δεν αποτελούν εγγύηση διαθεσιμότητας σε πραγματικό χρόνο.'],
        },
        {
          h: 'Εφαρμοστέο Δίκαιο και Επίλυση Διαφορών',
          p: [
            'Εφαρμοστέο Δίκαιο: Οι παρόντες Όροι και Προϋποθέσεις Χρήσης, καθώς και κάθε τροποποίησή τους, διέπονται και συμπληρώνονται από το Ελληνικό Δίκαιο, το Δίκαιο της Ευρωπαϊκής Ένωσης και τις σχετικές διεθνείς συνθήκες.',
            'Φιλικός Διακανονισμός: Στόχος μας είναι η άμεση και ικανοποιητική επίλυση οποιουδήποτε αιτήματος ή παράπονου προκύψει. Σε περίπτωση που ανακύψει οποιαδήποτε διαφορά, ενθαρρύνεται ο χρήστης/καταναλωτής να επικοινωνήσει πρώτα μαζί μας μέσω ηλεκτρονικού ταχυδρομείου στο taniskidis.g@gmail.com ή τηλεφωνικά στο 2310328128, προκειμένου να αναζητηθεί μια φιλική διευθέτηση του ζητήματος.',
            'Εναλλακτική Επίλυση Διαφορών (ΕΕΔ): Ως καταναλωτής μπορείτε να προσφύγετε σε φορείς εναλλακτικής επίλυσης καταναλωτικών διαφορών σύμφωνα με την Οδηγία 2013/11/ΕΕ, όπως ο Συνήγορος του Καταναλωτή (https://www.synigoroskatanaloti.gr).',
            'Δωσιδικία (Αρμόδια Δικαστήρια): Σε περίπτωση που δεν καταστεί δυνατή η φιλική επίλυση της διαφοράς, αποκλειστικά αρμόδια για την επίλυση οποιασδήποτε διαφοράς προκύψει από ή σε σχέση με τη χρήση της παρούσας ιστοσελίδας ή την πώληση προϊόντων/υπηρεσιών μέσω αυτής ορίζονται τα καθ\' ύλην αρμόδια Δικαστήρια Θεσσαλονίκης.',
          ],
        },
      ],
    },
  },
  en: {
    shipping: {
      title: 'Shipping and delivery',
      intro: '',
      sections: [
        {
          h: 'Shipping cost',
          p: [
            'Shipping is €5 per order, regardless of the number of products, and is shown in the order summary.',
            'If you collect the order from the store there is no shipping charge.',
          ],
        },
        {
          h: 'Payment',
          p: ['Payment is by bank transfer (IBAN) or IRIS, after the shop confirms your order. Cash on delivery and online card payments are not offered. The order is completed after confirmation and payment, as we will inform you. Payment must be made within 2 business days of confirmation, otherwise the order is automatically cancelled.'],
        },
        {
          h: 'Order confirmation',
          p: [
            'Submitting the order form is a purchase request. The shop checks availability, price and shipping and contacts you to confirm. Delivery time and method are agreed at confirmation. Deliveries cover all of Greece and are carried out through partner courier companies, BOX NOW lockers, or by pickup from our physical store.',
          ],
        },
      ],
    },
    returns: {
      title: 'Returns, withdrawal and cancellations',
      intro: '',
      sections: [
        {
          h: 'Right of withdrawal',
          p: [
            'As a consumer you generally have the right to withdraw from a distance contract within 14 days of receiving the goods, without giving a reason, in accordance with applicable law.',
            'To exercise the right of withdrawal, the products must be returned in their original perfect condition, unworn, with their labels and original packaging. The direct costs of returning the products are borne by the buyer. The right of withdrawal does not apply to products that are made or processed according to the consumer\'s special order/specifications, as well as to products that are not suitable for return for reasons of health or hygiene protection once unsealed after delivery.',
          ],
        },
        {
          h: 'How to exercise the right of withdrawal',
          p: [
            'Contact us with a clear statement that you wish to withdraw, via email at taniskidis.g@gmail.com or by phone at 2310328128. The products are returned to the address: Marasli 75, PC 54249, Thessaloniki, either by courier of your choice or easily via BOX NOW.',
            'The products must be returned in a condition that permits resale, as required by law (unworn, with labels and original packaging). The shipping cost for the return is borne by the customer.',
          ],
        },
        {
          h: 'Refunds',
          p: [
            'In the event that the right of withdrawal is exercised, your refund will be completed within 14 calendar days from the date we receive the returned goods and confirm they are in their original perfect condition.',
            'The refund is made using the same payment method used for your original purchase, that is, by deposit to the bank account (IBAN) or via IRIS that you indicate to us.',
          ],
        },
      ],
    },
    privacy: {
      title: 'Privacy policy',
      intro: '',
      sections: [
        {
          h: 'Data controller',
          p: ['The controller of your personal data is LANGZI, VAT no. 016472415, Tax Office: Ampelokipoi, GEMI no. 168002104000, Marasli 75, PC 54249, Thessaloniki, email: taniskidis.g@gmail.com, tel.: 2310328128.'],
        },
        {
          h: 'What data we collect',
          p: [
            'Through the order form: full name, phone, delivery address, optionally email and delivery instructions, and the products you order.',
            'We do not request card payment details.',
          ],
        },
        {
          h: 'Purpose and legal basis',
          p: ['Your data is used to process and deliver your order and to communicate with you regarding it. The processing of your data is necessary for the performance of the contract between us (Article 6(1)(b) GDPR), as well as for our compliance with legal and tax obligations (Article 6(1)(c) GDPR), such as issuing invoices and retaining tax records in accordance with applicable law.'],
        },
        {
          h: 'Storage on your device',
          p: ['The cart and language are stored locally in your browser (LocalStorage). Personal delivery details are not stored there.'],
        },
        {
          h: 'Hosting and servers',
          p: ['The website is hosted by Netlify and orders are collected through Netlify Forms.'],
        },
        {
          h: 'Cookies and analytics',
          p: ['Analytics or advertising cookies are loaded only if configured and after you give consent.'],
        },
        {
          h: 'Your rights',
          p: ['To exercise your rights, you may contact us at taniskidis.g@gmail.com. Your personal data is retained for the period required to perform the order and thereafter for as long as required by tax legislation or for the defense of our legal rights.'],
        },
      ],
    },
    terms: {
      title: 'Terms and conditions',
      intro: '',
      sections: [
        {
          h: 'Orders',
          p: [
            'Submitting an order is an offer to buy. The contract is concluded when the shop confirms your order.',
            'The shop may decline to confirm an order in case of unavailability or a pricing error, and will inform you.',
          ],
        },
        {
          h: 'Prices',
          p: [
            'Prices are in euro. Bundle prices: 1 shirt €25, 2 shirts €40, 3 shirts €50. VAT is included in all prices.',
            'Shipping is €5 per order and free for store pickup.',
          ],
        },
        {
          h: 'Payment',
          p: ['Bank transfer (IBAN) or IRIS, after the order is confirmed.'],
        },
        {
          h: 'Availability',
          p: ['Availability is confirmed by the shop. Indications on the website are not a guarantee of real-time availability.'],
        },
        {
          h: 'Governing Law and Dispute Resolution',
          p: [
            'Governing Law: These Terms and Conditions of Use and any amendments hereto are governed by and supplemented by Greek Law, European Union Law and relevant international treaties.',
            'Friendly Settlement: Our goal is the immediate and satisfactory resolution of any request or complaint that may arise. Should any dispute arise, the user/consumer is encouraged to contact us first via email at taniskidis.g@gmail.com or by phone at 2310328128, in order to seek an amicable resolution of the matter.',
            'Alternative Dispute Resolution (ADR): As a consumer you may turn to bodies for the out-of-court resolution of consumer disputes under Directive 2013/11/EU, such as the Consumer Ombudsman (https://www.synigoroskatanaloti.gr).',
            'Jurisdiction (Competent Courts): Should amicable resolution of the dispute prove impossible, the exclusively competent courts for resolving any dispute arising from or in connection with the use of this website or the sale of products/services through it shall be the competent courts of Thessaloniki.',
          ],
        },
      ],
    },
  },
};
