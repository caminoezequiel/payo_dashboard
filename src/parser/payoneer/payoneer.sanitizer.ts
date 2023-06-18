export class PayoneerSanitizer {
    static sanitize(line: string): string {
        line = PayoneerSanitizer.sanitizeDate(line)
        line = PayoneerSanitizer.sanitizeAmount(line)
        line = PayoneerSanitizer.sanitizeDescription(line)
        return PayoneerSanitizer.sanitizeQuotes(line)
    }

    static sanitizeDate(line: string): string {
        // transform '10 Oct, 2022' to '10-Oct-2022'
        return line
            .trim()
            .replaceAll(/(\d{2})\s(\w{3}),\s(\d{4})/ig, '$1-$2-$3')
    }

    static sanitizeAmount(line: string): string {
        // transform '1,000.00' to '1000.00'
        return line?.replaceAll(/(\d),(\d{3})/ig, '$1$2')
    }

    static sanitizeDescription(line: string): string {
        return line
            // transform ',Card charge (Merchant, Location),' to ',Card charge (Merchant; Location),'
            .replaceAll(/(\(.+),(.+\))/ig, '$1;$2')
            .replaceAll('Maintenance fee,', 'Maintenance fee ')
    }

    static sanitizeQuotes(line: string) {
        // remove extra quotes "
        return line?.replaceAll('"', '')
    }
}